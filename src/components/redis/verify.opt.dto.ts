import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/(^\+84|^0)\d{9}$/g, {
        message: 'this is not Viet Nam phone number'
    })
    phoneNumber: string;

    @ApiProperty()
    @Length(6, 6)
    smsCode: string;
}
