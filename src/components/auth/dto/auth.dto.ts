import {
    IsNotEmpty,
    IsString,
    IsDateString,
    IsEmail,
    IsMACAddress,
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
    @IsMACAddress()
    mac: string;

    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+84|^0)\d{9}$/g, {
        message: 'this is not Viet Nam phone number'
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
    @Length(0, 127)
    fullname: string;

    @ApiProperty({
        description: 'Email'
    })
    @IsEmail()
    email: string;
}
