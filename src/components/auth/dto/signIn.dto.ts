import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
    @ApiProperty({
        description: 'MAC address'
    })
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
}
