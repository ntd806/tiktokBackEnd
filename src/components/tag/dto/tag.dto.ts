import { IsArray, IsDateString, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
    @ApiProperty({
        description: 'Name of tag'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        description: 'Created at',
        default: 'now()'
    })
    @IsDateString()
    @ValidateIf((object, value) => value !== null)
    createdAt: Date;

    @ApiProperty({
        description: 'Updated at',
        required: false
    })
    @IsDateString()
    @ValidateIf((object, value) => value !== null)
    updatedAt: Date;

    @ApiProperty({
        description: 'Tag related',
        required: false,
        default: []
    })
    @IsArray()
    @ValidateIf((object, value) => value !== null)
    tagRelate: [
        {
            tagId: string;
            tagName: string;
        }
    ]

    @ApiProperty({
        description: 'Created by',
        required: true,
        default: ''
    })
    @IsString()
    @IsNotEmpty()
    @ValidateIf((object, value) => value !== null)
    createdBy: string

    @ApiProperty({
        description: 'Updated by',
        required: false,
        default: ''
    })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    updatedBy: string

    @ApiProperty({
        description: 'Tag category',
        required: false,
        default: ''
    })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    tagCategory: string;
}
