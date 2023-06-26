import { createReadStream } from 'fs';
import { MESSAGES } from '../messages.js';
import { EOL } from 'os';

const read = async (fileURL) => {
  try {
    const input = createReadStream(fileURL);
    input.on('error', (err) => console.log(MESSAGES.failure + EOL, err));
    input.pipe(process.stdout);
  } catch (err) {
    console.log(err);
  }
};

export default read;
