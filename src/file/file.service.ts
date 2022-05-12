import { Injectable, UploadedFile, Post } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';

import { FileRepository } from './file.repository';

import { ResponseData } from '../base/responseData.entity.base';

import { GetListFile } from './schema/getListFile.schema';

@Injectable()
export class FileService {
    constructor(
        @InjectRepository(FileRepository)
        private fileRepository: FileRepository
    ) {}

    public async getList(
        params: GetListFile
    ): Promise<ResponseData> {
        return await this.fileRepository.list(params);
    }

    public async uploadFile(
        @UploadedFile() file: Express.Multer.File
    ): Promise<any> {
        return await this.fileRepository.upload(file);
    }

    public async urlFileDetail(
        key: string
    ): Promise<string> {
        return await this.fileRepository.getUrlFile({ Key: key });
    }

}
