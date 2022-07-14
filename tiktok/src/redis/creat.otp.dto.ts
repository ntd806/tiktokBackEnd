import { ApiProperty } from '@nestjs/swagger';

export default class CreateOtpDto {
    @ApiProperty()
    phoneNumber: string;

    @ApiProperty()
    smsCode: string;
}
