import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEmail,
    Length,
    Matches,
    IsIP,
    IsUrl
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
    @ApiProperty({
        description: 'email of user'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'MAC address'
    })
    @ApiProperty()
    @IsString()
    mac: string;

    @ApiProperty({
        description: 'token of Google or Facebook'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    //todo: don't know format
    token: string;

    @ApiProperty({
        description: 'Id of Google or Facebook'
    })
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    //todo: don't know format
    id: string;

    @ApiProperty({
        description: 'fullname of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(0, 30, {
        message: 'Full name must be less than 30 characters'
    })
    @Matches(
        /^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/i,
        {
            message: 'Invalid username'
        }
    )
    fullname: string;

    @ApiProperty({
        description: 'Phone of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(
        /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/i,
        {
            message: 'Invalid phone number'
        }
    )
    phone: string;

    @ApiProperty({
        description: 'Ip of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIP()
    ip: string;

    @ApiProperty({
        description: 'url of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @ApiProperty({
        description: 'Is Google or not Google'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    isGoogle: number;
}
