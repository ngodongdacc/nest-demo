import { NotFoundException, BadRequestException, UploadedFile } from '@nestjs/common';
import { Repository, EntityRepository } from 'typeorm';
import * as path from 'path';
import * as http from 'http';
import { ListObjectsCommand, PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from '../aws/s3Client';
import { S3 } from '../aws/s3';
import { Var_globlal_AWS } from '../aws/const';

import { File } from './file.entity';

import { FileSchema } from './schema/file.schema';
import { ResponseData } from '../base/responseData.entity.base';
import { GetListFile } from './schema/getListFile.schema';

@EntityRepository(File)
export class FileRepository extends Repository<File> {
    
    public async list(
        param: GetListFile,
    ): Promise<ResponseData> {
        const respose = new ResponseData();
        respose.data = [];
        respose.keyPrev = param.keyPrev;
        respose.limit = 10;
        respose.next = false;

        const bucketParams = {
            Marker: param.keyPrev,
            Bucket: Var_globlal_AWS.bucket,
            MaxKeys: +param.limit || 10,
        };

        const data = await s3Client.send(new ListObjectsCommand(bucketParams));
        if(data && data.Contents){
            respose.data = data.Contents;
        }
        respose.next = data.IsTruncated;
        return respose;
    }

    public async upload(
        @UploadedFile() file: Express.Multer.File
    ): Promise<any> {
        const uploadParams  = {
            Bucket: Var_globlal_AWS.bucket,
            Key: file.originalname,// path.basename(file),
            Body: file.buffer,
        };

        const data = await s3Client.send(new PutObjectCommand(uploadParams));
        // if(data && data.Contents){
        //     respose.data = data.Contents;
        // }
        // respose.next = data.IsTruncated;
        return data;
    }

    public async getFile(
        param: {
            Key: string
        }
    ): Promise<any> {
        const bucketParams = {
            Bucket: Var_globlal_AWS.bucket,
            ...param,
        };
        
        const streamToString = (stream) =>
        new Promise((resolve, reject) => {
          const chunks = [];
          stream.on("data", (chunk) => chunks.push(chunk));
          stream.on("error", reject);
          stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
        });
  
        // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
        const data = await (await s3Client.send(new GetObjectCommand(bucketParams))).Body;
        // return data; // For unit tests.
        // Convert the ReadableStream to a string.
        const bodyContents = await streamToString(data);

        // const data = await S3.getObject(bucketParams).createReadStream();;
        return bodyContents;
    }
}