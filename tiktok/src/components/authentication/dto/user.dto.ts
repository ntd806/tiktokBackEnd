import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    public ip: string;

    @IsNotEmpty()
    @IsString()
    public name: string;

    @IsNotEmpty()
    @IsString()
    public phone: string;
}
