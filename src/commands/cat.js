import { createReadStream } from 'fs';
import { resolve, isAbsolute } from 'path';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const read = async (pathArg, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);
    const input = createReadStream(filePath, 'utf-8');
    input.on('error', (err) => console.log(MESSAGES.failure + EOL, err));
    input.pipe(process.stdout);
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default read;
