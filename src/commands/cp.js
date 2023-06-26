import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';

const copy = async (from, to) => {
  try {
    const fileName = path.basename(from);
    const rs = createReadStream(from);
    const ws = createWriteStream(path.join(to, fileName));
    await pipeline(rs, ws);
  } catch (err) {
    console.log(err);
    throw new Error('FS operation failed');
  }
};

export default copy;
