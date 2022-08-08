import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
    @ApiProperty({
        description: 'Name of tag'
    })
    @IsString()
    name: string;
}
