import path from 'path';
import EventEmitter from 'events';
import { join, extname, basename } from 'path';
import { readdir, stat, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import list from './commands/list.js';
import read from './commands/cat.js';
import renameFile from './commands/rn.js';
import copyFile from './commands/cp.js';
import moveFile from './commands/mv.js';
import removeFile from './commands/rm.js';
import hash from './commands/hash.js';
import compress from './commands/compress.js';
import decompress from './commands/decompress.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';
import Manager from './manager.js';
import { MESSAGES } from './messages.js';

// const eventEmitter = new EventEmitter({ captureRejections: true });
// eventEmitter.on('error', (e) => console.log('Error caught:', e.message));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentDir = homedir();

// create readline interface
const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
  //console.log(`Received: ${input}`);
  if (input.startsWith('cd ')) {
    let newDir = input.slice(3);
    try {
      process.chdir(path.join(currentDir, newDir));
      currentDir = path.join(currentDir, newDir);

      console.log('New directory: ' + process.cwd());
    } catch (err) {
      console.log('chdir: ' + err);
    }
  }

  if (input.startsWith('cat ')) {
    const fileToRead = input.slice(4);
    try {
      read(path.join(currentDir, fileToRead));
    } catch (err) {
      console.log(err);
    }
  }

  if (input.startsWith('add ')) {
    let newFileName = input.slice(4);
    writeFile(path.join(currentDir, newFileName), '', (err) => {
      console.log(MESSAGES.failure);
      console.log(err);
    });
  }

  if (input.startsWith('rn ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(3).match(argsRegex);
    const filePath = args[0];
    const newFileName = args[1];
    renameFile(filePath, newFileName);

    //console.log(filePath, newFileName);
  }

  if (input.startsWith('cp ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(3).match(argsRegex);
    const oldFilePath = args[0];
    const newFilePath = args[1];
    copyFile(oldFilePath, newFilePath);

    //console.log(filePath, newFileName);
  }

  if (input.startsWith('mv ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(3).match(argsRegex);
    const oldFilePath = args[0];
    const newFilePath = args[1];
    moveFile(oldFilePath, newFilePath);
  }

  if (input.startsWith('rm ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(3).match(argsRegex);
    const filePath = args[0];
    removeFile(filePath, currentDir);
  }

  if (input.startsWith('os ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(3).match(argsRegex);
    const arg = args[0].toLowerCase();

    switch (arg) {
      case '--eol': {
        console.log(EOL);
        break;
      }
      case '--cpus': {
        console.log(cpus());
        break;
      }
      case '--homedir': {
        console.log(homedir());
        break;
      }
      case '--username': {
        console.log(userInfo().username);
        break;
      }
      case '--architecture': {
        console.log(arch());
        break;
      }
    }
  }

  if (input.startsWith('hash ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(5).match(argsRegex);
    const fileToHash = args[0];

    console.log(hash(fileToHash));
  }

  if (input.startsWith('compress ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(9).match(argsRegex);
    const filePath = args[0];
    const destination = args[1] || null;
    compress(filePath, destination, currentDir);
  }

  if (input.startsWith('decompress ')) {
    const argsRegex = new RegExp(/[^\s]+/gi);
    const args = input.slice(11).match(argsRegex);
    const filePath = args[0];
    const destination = args[1] || null;
    decompress(filePath, destination, currentDir);
  }

  switch (input) {
    case 'up': {
      try {
        process.chdir('..');
        console.log('New directory: ' + process.cwd());
      } catch (err) {
        console.log('chdir: ' + err);
      }
    }

    case 'ls': {
      list(currentDir);
    }
  }
});

// read username from the CLI arguments and print the greeting to the console

const parseUsername = async () => {
  for (let arg of process.argv) {
    if (arg.startsWith('--username')) {
      return arg.slice(11); // the length of '--username=' string
    }
  }
  return undefined;
};
const username = await parseUsername();
console.log(`Welcome to the File Manager${username ? ', ' + username : ''}!`);

//print the working directory to the console

console.log(`you are currently in ${currentDir}`);

//pring farewell message to the console on exit
process.on('exit', () => {
  console.log(
    `Thank you for using File Manager, ${
      username ? username + ', ' : ''
    }goodbye!`
  );
});

// const manager = new Manager(os.homedir());
// manager.start();