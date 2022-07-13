import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
export class CreateGameDto {
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly url: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly image: string;
}
