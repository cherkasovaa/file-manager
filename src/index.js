import process from 'process';
import * as readline from 'readline';
import * as cli from './cli.js';
import * as osInfo from './osInfo.js';

const args = process.argv.slice(2);
const userNameArg = args.find(arg => arg.startsWith('--username='));
const userName = userNameArg ? userNameArg.split('=')[1] : 'Anonymous'

let currentDir = osInfo.getHomeDir();
  
console.log(`Welcome to the File Manager, ${userName}!`)
console.log(`You are currently in ${currentDir}!`)

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.on('line', async (input) => {
  const result = await cli.handleCommand(currentDir, input.trim());

  if (result.exit) {
    rl.close();
    return;
  }

  currentDir = result.dir;

  console.log(`You are currently in ${currentDir}`)
})

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`)
  process.exit(0)
})