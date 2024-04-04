import { Module } from '@nestjs/common';

@Module({
  providers: [FileService],
  export: [FileService],
})
export class FileModule {}
