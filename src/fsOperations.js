import { createReadStream, createWriteStream, } from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import { stdout } from 'process';
import { pipeline } from 'stream/promises';

// Read file and print it's content in console (should be done using Readable stream)
// cat path_to_file
const cat = async (currentDir, pathToFile) => {
  if (!pathToFile) {
    console.error('Invalid input');
    return;
  }

  const filePath = path.resolve(currentDir, pathToFile);
  const rs = createReadStream(filePath);

  rs.on('end', () => {
    console.log('');
  });
  
  rs.on('error', (err) => {
    console.error(`Operation failed with Error: ${err.message}`);
  })

  rs.pipe(stdout);
}

// Create empty file in current working directory
// add new_file_name
const add = async (currentDir, fileName) => {
  if (!fileName) {
    console.error('Invalid input');
    return;
  }

  try {
    const filePath = path.join(currentDir, fileName);
  
    await fsPromises.writeFile(filePath, '', {flag: 'wx'})
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`);
  }
}

// Create new directory in current working directory
// mkdir new_directory_name
const mkdir = async (currentDir, dirName) => {
  if (!dirName) {
    console.error('Invalid input');
    return;
  }

  try {
    const targetPath = path.join(currentDir, dirName);
    await fsPromises.mkdir(targetPath);
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`)
  }
}

// Rename file (content should remain unchanged)
// rn path_to_file new_filename
const rn = async (currentDir, pathToFile, newFilename) => {
  if (!pathToFile || !newFilename) {
    console.error('Invalid input');
    return;
  }

  try {
    const filePath = path.resolve(currentDir, pathToFile);
    const dirName = path.dirname(filePath);

    const newFilePath = path.join(dirName, newFilename);
    
    await fsPromises.rename(filePath, newFilePath);
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`)
  }
}

// Copy file (should be done using Readable and Writable streams)
// cp path_to_file path_to_new_directory
const cp = async (currentDir, pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    console.error('Invalid input');
    return;
  }

  try {
    const sourcePath = path.resolve(currentDir, pathToFile);
    const targetPath = path.resolve(currentDir, pathToNewDirectory);

    const fileName = path.basename(sourcePath);
    const copyFile = path.join(targetPath, fileName);

    const sourceStat = await fsPromises.stat(sourcePath);
    const targetStat = await fsPromises.stat(targetPath);
    if (!sourceStat.isFile() || !targetStat.isDirectory()) {
      console.error('Operation failed');
      return;
    }

    await pipeline(createReadStream(sourcePath), createWriteStream(copyFile));
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`)
  }
}

// Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)
// mv path_to_file path_to_new_directory
const mv = async (currentDir, pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) {
    console.error('Invalid input');
    return;
  }

  try {
    const sourcePath = path.resolve(currentDir, pathToFile);
    const targetPath = path.resolve(currentDir, pathToNewDirectory);

    const fileName = path.basename(sourcePath);
    const copyFile = path.join(targetPath, fileName);

    const sourceStat = await fsPromises.stat(sourcePath);
    const targetStat = await fsPromises.stat(targetPath);
    if (!sourceStat.isFile() || !targetStat.isDirectory()) {
      console.error('Operation failed');
      return;
    }

    const rs = createReadStream(sourcePath);
    const ws = createWriteStream(copyFile);

    await pipeline(rs, ws);
    await fsPromises.unlink(sourcePath);
    
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`)
  }
}

// Delete file
// rm path_to_file
const rm = async (currentDir, pathToFile) => {
  if (!pathToFile) {
    console.error('Invalid input');
    return;
  }

  try {
    const resolvePathToFile = path.resolve(currentDir, pathToFile);
    // Will delete only files 
    await fsPromises.unlink(resolvePathToFile);

    // Will delete files and empty directories
    // await fsPromises.rm(resolvePathToFile);
  } catch (err) {
    console.error(`Operation failed with Error: ${err.message}`)
  }
}

export { add, cat, cp, mkdir, mv, rm, rn };

