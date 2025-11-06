import { createReadStream, createWriteStream } from 'fs';
import { access, constants } from 'fs/promises';
import path from 'path';
import zlib from 'zlib';

const compress = async (currentDir, pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    console.log('Invalid input');
    return;
  }

  const src = path.resolve(currentDir, pathToFile);
  const dist = path.resolve(currentDir, pathToDestination);

  try {
    await access(src, constants.F_OK)
  } catch (err) {
    console.log(`Operation failed with error: ${err.message}`)
    return;
  }

  const rs = createReadStream(src);
  const ws = createWriteStream(dist);
  const brotli = new zlib.BrotliCompress();

  rs.pipe(brotli).pipe(ws);

  rs.on('error', (err) => console.log(`Operation failed with error: ${err.message}`));
  ws.on('error', (err) => console.log(`Operation failed with error: ${err.message}`));
}

const decompress = async (currentDir, pathToFile, pathToDestination) => {
  if (!pathToFile || !pathToDestination) {
    console.log('Invalid input');
    return;
  }

  const src = path.resolve(currentDir, pathToFile);
  const dist = path.resolve(currentDir, pathToDestination);

  try {
    await access(src, constants.F_OK)
  } catch (err) {
    console.log(`Operation failed with error: ${err.message}`);
    return;
  }

  const rs = createReadStream(src);
  const ws = createWriteStream(dist);
  const brotli = new zlib.BrotliDecompress();

  rs.pipe(brotli).pipe(ws);
  
  rs.on('error', (err) => console.log(`Operation failed with error: ${err.message}`));
  ws.on('error', (err) => console.log(`Operation failed with error: ${err.message}`));
}

export { compress, decompress };
