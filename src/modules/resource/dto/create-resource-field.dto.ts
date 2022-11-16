import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { DataType } from '../interfaces/data-type';

export class CreateResourceFieldDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    //@IsEnum(DataType.FieldTypeArr)
    type: DataType.FieldType;

    options?: DataType.FieldOptions;
}
