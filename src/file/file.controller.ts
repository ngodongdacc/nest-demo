import { Controller, Get, Query, UploadedFile,Post, UseInterceptors, Param,Res,Response, StreamableFile } from '@nestjs/common';
import { FileInterceptor,  } from '@nestjs/platform-express';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '../aws/s3Client';

import { createReadStream, ReadStream, writeFile, createWriteStream } from 'fs';
import { Duplex, Readable } from 'stream';
import * as streamBuffers from 'stream-buffers';
import { join } from 'path';

import { GetListFile } from './schema/getListFile.schema';

import { ResponseData } from '../base/responseData.entity.base';
import { FileService } from './file.service';
import { Var_globlal_AWS } from '../aws/const';

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

    @Get('/download')
    public async getFile(
        @Query() params: { file: string },
        @Response({ passthrough: true }) res): Promise<string> {
        const signedUrl = this.fileService.urlFileDetail(params.file)
        return signedUrl;
    }
}
