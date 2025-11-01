// up, cd, ls
import fs from 'fs/promises';

const up = () => {
  //
}

const cd = () => {
  //
}

const ls = async (path) => {
  try {
    const list = await fs.readdir(path, {withFileTypes: true});
  
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
    throw new Error('Operation failed')
  }
}

export { cd, ls, up };

