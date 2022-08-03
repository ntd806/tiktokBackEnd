import { IsNotEmpty, IsOptional, IsPositive, Transform } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
    @IsNotEmpty()
    @ApiProperty()
    search: string;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    limit: number = 10;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    @Transform(({ value }) => parseInt(value))
    offset: number = 0;
}
