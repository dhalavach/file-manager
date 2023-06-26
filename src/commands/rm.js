import { rm } from 'fs/promises';
import { resolve, isAbsolute } from 'path';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const remove = async (filePath, currentDir) => {
  try {
    if (isAbsolute(filePath)) {
      await rm(filePath);
      console.log(MESSAGES.success);
    } else {
      await rm(resolve(currentDir, filePath));
      console.log(MESSAGES.success);
    }
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default remove;
