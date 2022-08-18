import { IsNotEmpty, IsString, IsDateString, IsEmail, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ip: string;

    @ApiProperty()
    @IsString()
    mac: string;

    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    phone: string;

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
    @IsEmail()
    email: string;
}
