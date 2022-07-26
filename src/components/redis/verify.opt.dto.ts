import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty()
    smsCode: string;
}
