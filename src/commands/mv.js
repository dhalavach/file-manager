import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, isAbsolute, basename, join } from 'path';
import { rm } from 'fs/promises';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const move = async (fromArg, toArg, currentDir) => {
  try {
    const sourcePath = isAbsolute(fromArg)
      ? fromArg
      : resolve(currentDir, fromArg);

    const destinationPath = isAbsolute(toArg)
      ? join(toArg, basename(sourcePath))
      : join(resolve(currentDir, toArg), basename(sourcePath));

    const rs = createReadStream(sourcePath);
    const ws = createWriteStream(destinationPath);
    await pipeline(rs, ws);
    await rm(sourcePath);
    console.log(MESSAGES.success);
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default move;
