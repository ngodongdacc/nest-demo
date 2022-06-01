import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsNumberString,
  IsArray,
  IsObject,
  Contains,
  IsEmpty,
} from 'class-validator';

export class GetParamBase {
  @IsString()
  keyPrev: string;

  @IsNumberString()
  limit: number;
}
