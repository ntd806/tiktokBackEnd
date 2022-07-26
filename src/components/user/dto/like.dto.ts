import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
    @ApiProperty({
        description: 'ID of video'
    })
    @IsString()
    video_id: string;
}
