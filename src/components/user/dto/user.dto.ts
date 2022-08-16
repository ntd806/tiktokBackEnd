import { IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({
        description: 'Birthday of user'
    })
    @IsDateString()
    birthdate: Date;

    @ApiProperty({
        description: '0: male, 1: female'
    })
    @IsString()
    sex: string;

    @ApiProperty({
        description: 'Fullname of user'
    })
    @IsString()
    fullname: string;

    @ApiProperty({
        description: 'Email'
    })
    @IsString()
    email: string;
}
