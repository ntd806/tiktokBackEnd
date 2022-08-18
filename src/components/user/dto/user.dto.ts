import { IsString, IsDateString, Length, Matches, IsEmail } from 'class-validator';
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
    @Length(0, 30, {
        message: 'Full name must be less than 30 characters'
    })
    @Matches(/^[a-zA-Z0-9\s]+$/gi, {
        message: 'Invalid username',
    })
    fullname: string;

    @ApiProperty({
        description: 'Email'
    })
    @IsString()
    @IsEmail()
    email: string;
}
