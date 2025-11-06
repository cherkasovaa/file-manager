import fsPromises from 'fs/promises';
import path from 'path';

const up = async (currentDir) => {
  const newPath = path.join(currentDir, '..');
  
  return newPath;
}

const cd = async (currentDir, targetDir) => {
  try {
    if (!targetDir) {
      console.error('Operation failed. The target path does not exist');
    }
    
    const newPath = path.resolve(currentDir, targetDir);

    const stat = await fsPromises.stat(newPath);

    if (stat.isDirectory()) {
      return newPath;
    } else {
      console.error(`Operation failed. The target path "${targetDir}" is not a directory`)
      return currentDir;
    }

  } catch (err) {
    console.error(`Operation failed with error: ${err.message}`)
    return currentDir;
  }
}

const ls = async (path) => {
  try {
    const list = await fsPromises.readdir(path, {withFileTypes: true});
  
    const directories = list
      .filter(file => file.isDirectory())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(file => ({ 'Name': file.name, 'Type': 'directory' }))
    
    const files = list
      .filter(file => file.isFile())
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(file => ({ 'Name': file.name, 'Type': 'file' }))
  
    const result = [...directories, ...files]
  
    console.table(result)
  } catch (err) {
    console.error(`Operation failed with error: ${err.message}`)
  }
}

export { cd, ls, up };

