import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
    @IsNotEmpty()
    @ApiProperty()
    search: string;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    limit: number = 10;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    offset: number = 0;
}
