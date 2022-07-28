import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    description: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    url: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    preview: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    time: number;
}
