import { Controller, Post, Body, Get } from '@midwayjs/core';
import * as fs from 'fs';

@Controller('/')
export class UploadController {
  @Post('/upload')
  async upload(@Body() body: any): Promise<boolean>{
    let istrue = false;
    const data = body.fileData;
    fs.writeFileSync('file.txt', data, 'utf8');
    istrue = true;
    return istrue
  }

  @Get('/checkFile')
  async checkFile(): Promise<string>{
    let content: string = fs.readFileSync('file.txt', 'utf8');
    return content
  }
}