import os from 'os';
import process from 'process';
import * as readline from 'readline';
import * as fsOperations from './fsOperations.js';
import * as navigation from './navigation.js';

const args = process.argv.slice(2);
const userNameArg = args.find(arg => arg.startsWith('--username='));
const userName = userNameArg ? userNameArg.split('=')[1] : 'Anonymous'

let currentDir = os.homedir();
  
console.log(`Welcome to the File Manager, ${userName}!`)
console.log(`You are currently in ${currentDir}!`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', async (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '.exit') {
    rl.close();
    return;
  }

  const [command, ...args] = trimmedInput.split(' ');

  switch (command) {
    case 'up': currentDir = await navigation.up(currentDir);
      break;
    case 'cd': currentDir = await navigation.cd(currentDir, args[0]);
        break;
    case 'ls': await navigation.ls(currentDir);
      break;
    case 'cat': await fsOperations.cat(currentDir, args[0]);
      break;
    case 'add': await fsOperations.add(currentDir, args[0]);
      break;
    case 'mkdir': await fsOperations.mkdir(currentDir, args[0]);
      break;
    case 'rm': await fsOperations.rm(currentDir, args[0]);
      break;
    case 'rn': await fsOperations.rn(currentDir, args[0], args[1]);
      break;
    default: console.log('Invalid input');
      break;
  }

  console.log(`You are currently in ${currentDir}`)
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  process.exit(0)
})