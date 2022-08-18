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
    @Matches(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/i, {
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
    @Matches(/^[a-zA-Z0-9\s]+$/i, {
        message: 'Invalid username',
    })
    fullname: string;

    @ApiProperty({
        description: 'Email'
    })
    @IsEmail()
    email: string;
}
