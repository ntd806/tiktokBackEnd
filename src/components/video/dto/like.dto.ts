import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
    @ApiProperty({
        description: 'ID of video'
    })
    @IsString()
    url: string;

    @ApiProperty({
        description: 'type of video'
    })
    @IsNumber()
    isLive: number;
}
