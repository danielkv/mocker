import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export abstract class RequestListBaseDto {
    @IsOptional()
    @IsString()
    sortBy?: string;

    @IsOptional()
    @IsEnum(['ASC', 'DESC'])
    order?: 'ASC' | 'DESC';

    @IsNumber()
    @IsOptional()
    numberOfItems?: number;

    @IsNumber()
    @IsOptional()
    page?: number;
}
