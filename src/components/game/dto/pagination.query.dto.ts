import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Transform(value => Number(value))
    limit: number;

    @IsOptional()
    @IsNumber()
    @Transform(value => Number(value))
    offset: number;
}
