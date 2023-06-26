import path from 'path';
import { createInterface } from 'readline/promises';
import { MESSAGES } from './messages.js';

class Manager {
  constructor(homeDir) {
    this._currentDir = homeDir;
  }

  _resolve(p) {
    return path.resolve(this._currentDir, p);
  }

  async up() {
    const path = this._resolve('..');
    this._currentDir = await nwd.cd(path);
  }

  async cd(args) {
    const path = this.resolve(args[0]);
    this.currentDir = await nwd.cd(path);
  }

  async ls() {
    await nwd.ls(this._currentDir);
  }

  async start() {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }
}

export default Manager;
