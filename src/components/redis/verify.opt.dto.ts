import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/(^\+d{1,4})\d{9,10}$/g, {
        message: 'Invalid phone number'
    })
    phoneNumber: string;

    @ApiProperty()
    @Length(6, 6)
    smsCode: string;
}
