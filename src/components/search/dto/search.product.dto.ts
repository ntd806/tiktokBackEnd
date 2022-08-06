import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
    @IsNotEmpty()
    @ApiProperty()
    search: string;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    limit = 10;

    @IsOptional()
    @IsPositive()
    @ApiProperty()
    offset = 0;
}
