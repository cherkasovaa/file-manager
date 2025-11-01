import os from 'os';
import process from 'process';
import * as readline from 'readline';
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

rl.on('line', (input) => {
  const trimmedInput = input.trim();

  if (trimmedInput === '.exit') {
    rl.close();
    return;
  }

  if (trimmedInput === 'ls') {
    navigation.ls(currentDir);
  } else {
    console.log('Invalid input')
  }

  console.log(`You are currently in ${currentDir}!`)
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  process.exit(0)
})