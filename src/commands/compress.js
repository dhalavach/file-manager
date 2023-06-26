import { pipeline } from 'stream/promises';
import { createBrotliCompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { resolve, join, dirname, parse, isAbsolute } from 'path';

import { EOL } from 'os';
import { MESSAGES } from '../messages.js';

const compress = async (pathArg, destination, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);
    const compressedFilePath = destination
      ? destination
      : join(dirname(resolve(filePath)), parse(resolve(filePath)).name + '.br');

    await pipeline(
      createReadStream(filePath),
      createBrotliCompress(),
      createWriteStream(compressedFilePath)
    );
    console.log(MESSAGES.success);
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default compress;
