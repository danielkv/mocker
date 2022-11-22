import { IsOptional, IsString } from 'class-validator';

import { RequestListBaseDto } from '@shared/dto/request-base.dto';

export class ResourceQueryDto extends RequestListBaseDto {
    @IsString()
    @IsOptional()
    projectId?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    userId?: string;
}
