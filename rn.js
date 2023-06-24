import { rename as rn } from 'fs/promises';
import { join } from 'path';
import path from 'path';
import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const renameFile = async (filePath, newFileName) => {
  try {
    const newURL = path.join(path.dirname(filePath), newFileName);
    await rn(filePath, newURL);
  } catch (err) {
    console.log(err);
   // throw new Error('FS operation failed');
  }
};

export default renameFile;
