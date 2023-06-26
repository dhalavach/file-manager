import { writeFile } from 'fs/promises';
import { resolve, isAbsolute } from 'path';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const add = async (pathArg, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);

    await writeFile(filePath, '', (err) => {
      if (err) console.log(MESSAGES.failure + EOL, err);
      else console.log(MESSAGES.success);
    });
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default add;
