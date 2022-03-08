import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator"

export class CreateUserDto{
    @ApiProperty({example: 'email@mail.ru', description: 'Email'})
    @IsString({message: "Должно быть строкой"})
    @IsEmail({},{message: "Некорректный Емайл"})
    readonly email: string;
    @ApiProperty({example: '12345', description: 'Password'})
    @IsString({message: "Должно быть строкой"})
    @Length(4, 16, {message: "Не менее 5 и не более 16 символов"})
    readonly password: string;
}