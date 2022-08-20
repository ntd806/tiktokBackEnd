import { IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AvataDto {
    @ApiProperty({
        description: 'avatar of user'
    })
    @IsString()
    @ValidateIf((object, value) => value !== null)
    avatar: string;
}
