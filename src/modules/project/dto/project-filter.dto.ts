import { IsOptional, IsString } from 'class-validator';

export class ProjectFilterDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  userId?: string;
}
