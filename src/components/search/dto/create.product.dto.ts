import { IsNotEmpty, IsString, IsNumber, IsNumberString, isURL, IsUrl, ValidateIf } from 'class-validator';
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
    @IsUrl()
    url: string;

    @IsString()
    @ApiProperty({ description: 'if uploaded image file, please empty field, otherwise please fill image URL here if not upload image file'})
    @ValidateIf((object, value) => value !== null && value !== undefined)
    previewImage: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Tag _id from tag list'
    })
    tagId: string;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty()
    type: number;

    @IsNotEmpty()
    @IsNumberString()
    @ApiProperty()
    time: number;
}
