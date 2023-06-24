import path from 'path';

import { join, extname, basename } from 'path';
import { readdir, stat, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import list from './list.js';
import read from './cat.js';
import renameFile from './rn.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let currentDir = __dirname;

// create readline interface
const rl = readline.createInterface({ input, output });

rl.on('line', (input) => {
  //console.log(`Received: ${input}`);
  if (input.startsWith('cd ')) {
    let newDir = input.slice(3);
    try {
      process.chdir(path.join(currentDir, newDir));
      currentDir = path.join(__dirname, newDir);

      console.log('New directory: ' + process.cwd());
    } catch (err) {
      console.log('chdir: ' + err);
    }
  }

  if (input.startsWith('cat ')) {
    let fileToRead = input.slice(4);
    read(path.join(currentDir, fileToRead));
  }

  if (input.startsWith('add ')) {
    let newFileName = input.slice(4);
    writeFile(newFileName, '', (err) => {
      console.log(err);
      throw new Error('FS operation failed');
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
      list(process.cwd());
    }
  }
});

// read username from the CLI arguments and print the greeting to the console

const parseUsername = () => {
  for (let arg of process.argv) {
    if (arg.startsWith('--username')) {
      return arg.slice(11); // the length of '--username=' string
    }
  }
  return undefined;
};
const username = parseUsername();
console.log(`Welcome to the File Manager${username ? ', ' + username : ''}!`);

//print the working directory to the console

// console.log(`you are currently in ${process.argv[1]}`);
console.log(`you are currently in ${__dirname}`);

//pring farewell message to the console on exit
process.on('exit', () => {
  console.log(
    `Thank you for using File Manager, ${
      username ? username + ', ' : ''
    }goodbye!`
  );
});
