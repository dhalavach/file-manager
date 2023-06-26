import path from 'path';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import add from './commands/add.js';
import list from './commands/list.js';
import read from './commands/cat.js';
import renameFile from './commands/rn.js';
import copyFile from './commands/cp.js';
import moveFile from './commands/mv.js';
import removeFile from './commands/rm.js';
import hash from './commands/hash.js';
import compress from './commands/compress.js';
import decompress from './commands/decompress.js';
import getOsInfo from './commands/getOsInfo.js';
import { EOL, homedir } from 'os';
import { MESSAGES } from './messages.js';
import { validate } from './helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentDir = homedir();

// create readline interface
const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
  if (validate(input)) {
    //console.log(`Received: ${input}`);

    if (input.startsWith('cd ')) {
      let newDir = input.slice(3);
      try {
        process.chdir(path.join(currentDir, newDir));
        currentDir = path.join(currentDir, newDir);

        console.log('New directory: ' + process.cwd());
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('cat ')) {
      try {
        const fileToRead = input.slice(4);
        read(fileToRead, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('add ')) {
      try {
        const newFileName = input.slice(4);
        add(newFileName, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('rn ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(3).match(argsRegex);
        const filePath = args[0];
        const newFileName = args[1];
        renameFile(filePath, newFileName, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('cp ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(3).match(argsRegex);
        const fromArg = args[0];
        const toArg = args[1];
        copyFile(fromArg, toArg, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }

      //console.log(filePath, newFileName);
    }

    if (input.startsWith('mv ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(3).match(argsRegex);
        const fromArg = args[0];
        const toArg = args[1];
        moveFile(fromArg, toArg, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('rm ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(3).match(argsRegex);
        const filePath = args[0];
        removeFile(filePath, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('os ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(3).match(argsRegex);
        const arg = args[0].toLowerCase();
        getOsInfo(arg);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('hash ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(5).match(argsRegex);
        const fileToHash = args[0];

        console.log(hash(fileToHash, currentDir));
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('compress ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(9).match(argsRegex);
        const filePath = args[0];
        const destination = args[1] || null;
        compress(filePath, destination, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    if (input.startsWith('decompress ')) {
      try {
        const argsRegex = new RegExp(/[^\s]+/gi);
        const args = input.slice(11).match(argsRegex);
        const filePath = args[0];
        const destination = args[1] || null;
        decompress(filePath, destination, currentDir);
      } catch (err) {
        console.log(MESSAGES.failure + EOL, err);
      }
    }

    switch (input) {
      case 'up': {
        try {
          process.chdir(resolve(currentDir, '..'));
          currentDir = process.cwd();
          console.log('New directory: ' + process.cwd());
        } catch (err) {
          console.log(MESSAGES.failure + EOL, err);
        }
        break;
      }

      case 'ls': {
        try {
          list(currentDir);
        } catch (err) {
          console.log(MESSAGES.failure + EOL, err);
        }
        break;
      }
    }
  } else {
    console.log(MESSAGES.invalidInput);
  }
});

// read username from the CLI arguments and print the greeting and farewell to the console

const parseUsername = async () => {
  try {
    for (let arg of process.argv) {
      if (arg.startsWith('--username')) {
        return arg.slice(11); // the length of '--username=' string
      }
    }
  } catch (err) {
    console.log(err);
  }
  return undefined;
};

const username = await parseUsername();
console.log(`Welcome to the File Manager${username ? ', ' + username : ''}!`);
console.log(`you are currently in ${currentDir}`);
process.on('exit', () => {
  console.log(
    `Thank you for using File Manager, ${
      username ? username + ', ' : ''
    }goodbye!`
  );
});
