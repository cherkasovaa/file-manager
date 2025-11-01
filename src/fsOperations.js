import fsPromises from 'fs/promises';
import path from 'path';

// Read file and print it's content in console (should be done using Readable stream)
// cat path_to_file
const cat = () => {
  //
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
const mkdir = () => {
  //
}

// Rename file (content should remain unchanged)
// rn path_to_file new_filename
const rn = () => {
  //

}

// Copy file (should be done using Readable and Writable streams)
// cp path_to_file path_to_new_directory
const cp = () => {
  //
}

// Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams)
// mv path_to_file path_to_new_directory
const mv = () => {
  //
}

// Delete file
// rm path_to_file
const rm = () => {
  //
}

export { add, cat, cp, mkdir, mv, rm, rn };

