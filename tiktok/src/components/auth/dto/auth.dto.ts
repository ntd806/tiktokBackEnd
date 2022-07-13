import { IsNotEmpty, IsString, IsObject } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsObject()
    ip: object;

    @IsObject()
    mac: object;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
