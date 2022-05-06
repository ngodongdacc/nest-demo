import { IsString, MinLength, MaxLength, Matches, IsNumber, IsArray, IsObject, IsEmpty } from 'class-validator';

export class FileSchema {
  @IsString()
  @MinLength(1, {
    message: 'Key is required',
  })
  @MaxLength(255, {
    message: 'Key is too long, max 255 char',
  })
  Key: string;
  
  @MaxLength(255, {
    message: 'name is too long, max 255 char',
  })
  
  @IsString()
  LastModified: string;

  @IsString()
  ETag: string;
  
  // @IsArray()
  // ChecksumAlgorithm: object;
  
  @IsString()
  StorageClass: string;

  @IsNumber()
  Size: number;
}