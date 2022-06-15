import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import axios from 'axios';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as https from 'https';
import { Transaction } from './entities/transaction';
@Injectable()
export class MessageHandler {
  constructor(
    private configService: ConfigService,
    @Inject(Logger) private readonly logger: LoggerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async handleMessage(message: AWS.SQS.Message): Promise<string> {
    try {
      const obj: any = JSON.parse(message.Body);
      const key = obj.Records[0].s3.object.key;
      const pathFile = await this.saveFile({ key });
      return pathFile.toString();
    } catch (error) {
      this.logger.error(
        ' error:: handleMessage ',
        error.message && error.message,
      );
      throw error;
    }
  }

  async saveFile(param: { key: string }) {
    try {
      return new Promise(async (resolve, rejects) => {
        const keyArray = param.key.split('/');
        const urlFile = await this.getUrlFile({ key: param.key });
        const pathSaveFile = await this.checkPath(
          this.configService.get('pathSaveFile'),
        );
        const pathFile = pathSaveFile + `${keyArray[keyArray.length - 1]}`;

        fs.exists(pathSaveFile, (exist) => {
          if (exist) {
            const file = fs.createWriteStream(pathFile);
            const request = https.get(urlFile);
            request.on('response', function (response) {
              response.pipe(file);
              // after download completed close filestream
              file.on('finish', () => {
                file.close();
                resolve(pathFile);
              });
              file.on('error', (err) => {
                // this.logger.error('Error:: save file', err.message && err.message);
                file.close();
                rejects(err);
              });
            });
            request.on('error', function (response) {
              // this.logger.error(`Error:: download file s3`, response.message && response.message);
              rejects(response);
            });
          } else {
            this.logger.error(`File does not exist: ${pathFile}`);
            rejects(`File does not exist: ${pathFile}`);
          }
        });
      });
    } catch (error) {
      this.logger.error(' Error:: saveFile ', error.message && error.message);
      throw error;
    }
  }

  async getUrlFile(param: { key: string }) {
    try {
      const bucketParams = {
        Bucket: this.configService.get<string>('s3.bucket'),
        Key: param.key,
      };
      const s3 = new AWS.S3({
        region: this.configService.get<string>('s3.region'),
        accessKeyId: this.configService.get<string>('s3.aws_access_key_id'),
        secretAccessKey: this.configService.get<string>(
          's3.aws_secret_access_key',
        ),
      });
      const urlFile = await s3.getSignedUrl('getObject', bucketParams);
      return urlFile;
    } catch (error) {
      this.logger.error(
        ' Error:: get url file s3 ',
        error.message && error.message,
      );
      throw error;
    }
  }

  async createTransaction(
    list: Array<Transaction>,
    stop: boolean,
    fileName: string,
  ) {
    try {
      console.log('Begin sending data to TCL Transaction service');
      let token = await this.cacheManager.get('token');
      if (!token) {
        token = await this.getTokenApi();
      }
      const url = this.configService.get<string>('api.transaction');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const fail = [];
      const failError = [];
      const failService = [];
      await Promise.allSettled(
        list.map((data) =>
          axios
            .post(url, data, config)
            .then((result) => {
              if (result.data.status.code !== 200) {
                const failFind = failService.find(
                  (f) => f.status.code === result.data.status.code,
                );
                if (!failFind) {
                  failService.push({
                    status: result.data.status,
                    data: [data.storeCodeOrigin],
                  });
                } else {
                  failFind.data.push(data.storeCodeOrigin);
                }
              }
              // this.telegramService.sendMessage(JSON.stringify(result.data));
              return result.data;
            })
            .catch((e) => {
              if (e.response && e.response.status === 403) {
                const failFind = failError.find((f) => f.status.code === 403);
                if (failFind) {
                  failFind.data.push(data.storeCodeOrigin);
                } else {
                  failError.push({
                    status: {
                      message: 'Forbidden',
                      code: 403,
                      success: false,
                    },
                    data: [data.storeCodeOrigin],
                  });
                }
                fail.push(data);
              }
            }),
        ),
      );
      if (fail.length && !stop) {
        await this.createTransaction(fail, true, fileName);
      }
      if ((failError.length && stop) || failService.length) {
        this.logger.error(` fail create transaction ${fileName} `, failError);
        // this.telegramService.sendMessage('fail create transaction', fileName, failError);
      }

      console.log('Success sending data to TCL Transaction service');
      return true;
    } catch (error) {
      this.logger.error(
        `error:: createTransaction ${fileName} `,
        error.message && error.message,
      );
      throw error;
    }
  }

  async getTokenApi() {
    try {
      const url = this.configService.get<string>('api.getToken') + '/token';
      const data = {
        clientName: this.configService.get<string>('api.clientName'),
        secret: this.configService.get<string>('api.secret'),
      };
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const result = await axios.post(url, data, config);
      let token;
      if (result.data && result.data.data && result.data.data.token) {
        const expireIn = result.data.data.expireIn;
        const expireInTokenTapTap =
          new Date().getTime() + expireIn * 1000 - 0.5 * 60 * 60 * 1000;
        token = result.data.data.token;
        await this.cacheManager.set('token', token, {
          ttl: expireInTokenTapTap,
        });
      } else {
        this.logger.error(` fail token api serivce `);
        throw new Error('fail token api serivce');
      }
      return token;
    } catch (error) {
      this.logger.error(
        ` error:: getTokenApi `,
        error.message && error.message,
      );
      throw error;
    }
  }

  async postTransaction(token: string, data: Transaction) {
    try {
      const url = this.configService.get<string>('api.transaction');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await axios.post(url, data, config);
      return result.data;
    } catch (error) {
      this.logger.error(
        ` error:: postTransaction `,
        error.message && error.message,
      );
      throw error;
    }
  }

  async checkPath(path: string) {
    const lengthPath = path.length;
    if (path.slice(lengthPath - 1, lengthPath) === '/') return path;
    return path + '/';
  }
}
