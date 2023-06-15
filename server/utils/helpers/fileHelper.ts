import fs from 'fs';

export function bufferConvertToString(fileString: string): string {
  const filePath: string = `${__dirname}/../../public/img/${fileString}`;
  const buffer = fs.readFileSync(filePath).toString('base64');

  return buffer;
}
