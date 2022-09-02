import { IsString, IsOptional, ValidateIf, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ReactionDto {

    @ApiProperty({
        description: '_id of video (streamKey if is live stream)'
    })
    @IsString()
    videoId: string;

    @ApiProperty({
        description: 'URL of video'
    })
    @IsString()
    url: string;

    @ApiProperty({
        description: 'type of video',
        default: false
    })
    @IsBoolean()
    isLive: boolean;
}
