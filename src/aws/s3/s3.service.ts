import { ConfigService } from '@nestjs/config';
import * as S3 from 'aws-sdk/clients/s3';
export class S3Service {
  s3: any;
  queueUrl: string;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3({
      region: this.configService.get<string>('s3.region'),
      accessKeyId: this.configService.get<string>('s3.aws_access_key_id'),
      secretAccessKey: this.configService.get<string>(
        's3.aws_secret_access_key',
      ),
    });
  }
}
