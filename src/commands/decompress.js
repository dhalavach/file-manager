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

    // const brotli = createBrotliDecompress();
    // const readStream = createReadStream(filePath);
    // const writeStream = createWriteStream(decompressedFilePath);

    // const stream = readStream.pipe(brotli).pipe(writeStream);

    // stream.on('error', (err) => {
    //   console.log(MESSAGES.failure + EOL, err);
    // });

    // stream.on('finish', () => {
    //   console.log(MESSAGES.success);
    // });

    await pipeline(
      createReadStream(filePath),
      createBrotliDecompress(),
      createWriteStream(decompressedFilePath)
    );
  } catch (err) {
    console.log(MESSAGES.failure + EOL, err);
  }
};

export default decompress;
