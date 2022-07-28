import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchProductDto {
    @IsNotEmpty()
    @ApiProperty()
    search: string;
}
