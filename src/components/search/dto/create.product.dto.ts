import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
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
    @IsString()
    @ApiProperty()
    tag: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    type: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    time: number;
}
