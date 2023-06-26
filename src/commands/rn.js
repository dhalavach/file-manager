import { rename as rn } from 'fs/promises';
import { join, resolve, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const renameFile = async (pathArg, newFileName, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);

    // const newURL = path.join(path.dirname(filePath), newFileName);
    const renamedFilePath = join(dirname(filePath), newFileName);
    await rn(filePath, renamedFilePath);
    console.log(MESSAGES.success);
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
    // throw new Error('FS operation failed');
  }
};

export default renameFile;
