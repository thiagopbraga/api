import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      file.originalname,
    );
    const result = await writeFile(path, file.buffer);
    
  }
}
