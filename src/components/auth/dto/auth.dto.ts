import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsEmail,
    Matches,
    IsIP,
    Length
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIP()
    ip: string;

    @ApiProperty()
    @IsString()
    mac: string;

    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+d{1,4})\d{9,10}$/g, {
        message: 'Invalid phone number'
    })
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
    @Matches(/[01]/, {
        message: 'no gender specified'
    })
    sex: string;

    @ApiProperty({
        description: 'Fullname of user'
    })
    @IsString()
    @IsNotEmpty()
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
