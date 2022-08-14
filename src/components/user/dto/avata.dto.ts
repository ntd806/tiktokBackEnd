import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvataDto {
    @ApiProperty({
        description: 'avatar of user'
    })
    @IsString()
    avatar: string;
}
