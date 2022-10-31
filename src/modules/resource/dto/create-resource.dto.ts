import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateResourceFieldDto } from './create-resource-field.dto';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  path: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CreateResourceFieldDto)
  @IsNotEmpty()
  fields: CreateResourceFieldDto[];
}
