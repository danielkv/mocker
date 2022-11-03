import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import {
    ResourceFieldType,
    ResourceFieldTypeArr,
} from '../interfaces/data-generator';

export class CreateResourceFieldDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(ResourceFieldTypeArr)
    type: ResourceFieldType;

    options?: string;
}
