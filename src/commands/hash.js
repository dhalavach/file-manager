import { readFile } from 'fs/promises';
import { createReadStream } from 'fs';
import { Transform } from 'stream';
import { pipeline } from 'stream';
import { createHash } from 'crypto';
import { resolve, isAbsolute } from 'path';

// const hash = async (filePath) => {
//   const rs = createReadStream(filePath);
//   const calcHash = (file) => {
//     createHash('sha256').update(file);
//   };

//   const transformingStream = new Transform({
//     transform(chunk, encoding, callback) {
//       callback(null, calcHash(chunk));
//     },
//   });

//   pipeline(rs, transformingStream, process.stdout);
// };

const hash = async (pathArg, currentDir) => {
  try {
    const filePath = isAbsolute(pathArg)
      ? pathArg
      : resolve(currentDir, pathArg);

    const dataSource = await readFile(filePath);
    const dataEncoded = createHash('sha256').update(dataSource);
    console.log(dataEncoded.digest('hex'));
  } catch (err) {
    console.log(err);
  }
};
export default hash;
