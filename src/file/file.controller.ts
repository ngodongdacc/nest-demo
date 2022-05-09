import { Controller, Get, Query, UploadedFile,Post, UseInterceptors, Param,Res,Response, StreamableFile } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { createReadStream, ReadStream, writeFile } from 'fs';
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
        // res.set({
        //     'Content-Type': 'application/pdf',
        //     'Content-Disposition': 'attachment; filename=quote.pdf',
        // });
        const data  = await this.fileService.getFileDetail(params.file);
        // writeFile('file.pdf', data, function (err) {
        //     if (err) throw err;
        //     console.log('Saved!');
        // });
        // const file = Buffer.from(data);
        // function bufferToStream(buffer) {
        //     var stream = new Readable();
        //     stream.push(buffer);
        //     stream.push(null);
        //     return stream;
        // }
        // const files = bufferToStream(data);
        res.attachment(params.file);
        // data.pipe(res);
        return data;
    }
}
