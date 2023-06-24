import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';

const read = async (fileURL) => {
  try {
    //const fileURL = new URL(file, import.meta.url);
    const input = createReadStream(fileURL);
    const output = process.stdout;
    await pipeline(input, output);
    input.destroy();
  } catch (err) {
    console.log(err);
    throw new Error('FS operation failed');
  }
};

export default read;
