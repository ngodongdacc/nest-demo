import { Controller, Get, Query, UploadedFile,Post, UseInterceptors, Param,Res,Response, StreamableFile } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { createReadStream, ReadStream } from 'fs';
import { Duplex, Readable } from 'stream';
import * as streamBuffers from 'stream-buffers';
import { join } from 'path';

import { GetListFile } from './schema/getListFile.schema';

import { ResponseData } from '../base/responseData.entity.base';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
    constructor( private fileService : FileService ) {}
    @Get('/list')
    public async getListFile(
        @Query() params 
    ): Promise<ResponseData> {
        return await this.fileService.getList(params);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    public async uploadFile(
        @UploadedFile() file: Express.Multer.File 
    ): Promise<ResponseData> {
        return await this.fileService.uploadFile(file);
    }

    @Get('/detail')
    public async getFile(
        @Query() params: { file: string },
        @Response({ passthrough: true }) res): Promise<any> {
        const data  = await this.fileService.getFileDetail(params.file);
        // console.log('data:: ', data);
        
        // const staf = statSync(data);
        // console.log('staf;: ', staf.size);
        
        const file = Buffer.from(data);
        // console.log('file:: ', file);
        
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=quote.pdf',
          });

        function bufferToStream(buffer) { 
            var stream = new Readable();
            stream.push(buffer);
            stream.push(null);
            
            return stream;
        }
        const files = bufferToStream(file);
        files.pipe(res);
        // var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
        // frequency: 10,      // in milliseconds.
        // chunkSize: 2048     // in bytes.
        // }); 
        
        // // With a buffer
        // myReadableStreamBuffer.put(data);
        console.log('files:: ', files);
        return files;
    }
}
