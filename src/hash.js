import { createHash } from 'crypto';
import { createReadStream } from 'fs';
import fsPromises from 'fs/promises';
import path from 'node:path';

const calcHash = async (currentDir, pathToFile) => {
  if (!pathToFile) {
    console.error('Invalid input');
    return;
  }

  const src = path.resolve(currentDir, pathToFile);

  const stat = await fsPromises.stat(src);
  if (!stat.isFile()) {
    console.error('Operation failed. We could not found the file for provided path');
    return;
  }

  const hash = createHash('sha256');
  const rs = createReadStream(src);

  rs.on('data', (chunk) => hash.update(chunk));
  rs.on('end', () => {
    console.log(`Hash of file is ${hash.digest('hex')}`);
  });
  rs.on('error', (err) => {
    console.error(`Operation failed with Error: ${err.message}`)
  })
}

export { calcHash };
