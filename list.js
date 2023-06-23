import path from 'path';
import { join, extname, basename } from 'path';
import { readdir, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async (folderPath) => {
  try {
    const files = await readdir(folderPath, { withFileTypes: true });

    const directoryInfo = await Promise.all(
      files.map(async (file) => {
        if (!file.isFile()) {
          const directoryPath = join(folderPath, file.name);
          const dirName = basename(directoryPath);

          return {
            type: 'directory',
            name: dirName,
            extension: '',
            size: '',
          };
        }
      })
    );

    const fileInfo = await Promise.all(
      files.map(async (file) => {
        if (file.isFile()) {
          const filePath = join(folderPath, file.name);
          const fileExt = extname(file.name);
          const fileStats = await stat(filePath);
          const fileName = basename(filePath, fileExt);
          const fileSize = fileStats.size;
          const formattedExt = fileExt.slice(1);
          const formattedSize = (fileSize / 1024).toFixed(2) + 'Kb';

          return {
            type: 'file',
            name: fileName,
            extension: formattedExt,
            size: formattedSize,
          };
        }
      })
    );

    console.log(`Directories and files in folder ${folderPath}`);

    let info = [...directoryInfo, ...fileInfo].filter(Boolean);
    console.table(info);
    // console.table(directoryInfo.filter(Boolean));
    // console.table(fileInfo.filter(Boolean));
  } catch (err) {
    console.log(err);
    throw new Error('Reading folder info operation failed');
  }
};

export default list;
