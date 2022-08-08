import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagUpdateDto {
    @ApiProperty({
        description: 'Name of tag'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Name of tag update'
    })
    @IsString()
    nameUpdate: string;
}
