import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
    ResourceFieldType,
    ResourceFieldTypeArr,
} from '../interfaces/data-type-helper';
import { FieldOptions } from '../interfaces/field-options';

export class CreateResourceFieldDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(ResourceFieldTypeArr)
    type: ResourceFieldType;

    options?: FieldOptions;
}
