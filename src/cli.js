import * as compression from './compression.js';
import * as fsOperations from './fsOperations.js';
import * as hash from './hash.js';
import * as navigation from './navigation.js';
import * as osInfo from './osInfo.js';

const handleCommand = async (currentDir, input) => {
  let result = {
    dir: currentDir,
    exit: false
  }

  const [command, ...args] = input.split(' ');

  switch (command) {
    case '.exit': result = {...result, exit: true};
      break;
    case 'up': result = {...result, dir: await navigation.up(result.dir)};
      break;
    case 'cd': result = { ...result, dir: await navigation.cd(result.dir, args[0]) };
        break;
    case 'ls': await navigation.ls(result.dir);
      break;
    case 'cat': await fsOperations.cat(result.dir, args[0]);
      break;
    case 'add': await fsOperations.add(result.dir, args[0]);
      break;
    case 'mkdir': await fsOperations.mkdir(result.dir, args[0]);
      break;
    case 'rm': await fsOperations.rm(result.dir, args[0]);
      break;
    case 'rn': await fsOperations.rn(result.dir, args[0], args[1]);
      break;
    case 'cp': await fsOperations.cp(result.dir, args[0], args[1]);
      break;
    case 'mv': await fsOperations.mv(result.dir, args[0], args[1]);
      break;
    case 'hash': await hash.calcHash(result.dir, args[0]);
      break;
    case 'os': await osInfo.doCommand(args[0]);
      break;
    case 'compress': await compression.compress(result.dir, args[0], args[1]);
      break;
    case 'decompress': await compression.decompress(result.dir, args[0], args[1]);
      break;
    default: console.log('Invalid input');
      break;
  }

  return result;
}

export { handleCommand };
