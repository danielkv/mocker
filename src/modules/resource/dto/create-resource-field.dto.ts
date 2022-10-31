import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { ResourceFieldType, ResourceFieldTypeArr } from '@shared/types/fields';

export class CreateResourceFieldDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEnum(ResourceFieldTypeArr)
    type: ResourceFieldType;
}
