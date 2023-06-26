import { pipeline } from 'stream/promises';
import { createBrotliDecompress } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { dirname, join, resolve, parse, isAbsolute } from 'path';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const decompress = async (pathArg, destination, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);
    const decompressedFilePath = destination
      ? destination
      : join(
          dirname(resolve(filePath)),
          parse(resolve(filePath)).name + '.txt'
        );

    await pipeline(
      createReadStream(filePath),
      createBrotliDecompress(),
      createWriteStream(decompressedFilePath)
    );
    console.log(MESSAGES.success + EOL);
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default decompress;
