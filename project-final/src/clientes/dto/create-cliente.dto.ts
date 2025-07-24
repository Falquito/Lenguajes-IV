import { IsEmail, IsString, IsStrongPassword, MinLength } from "class-validator"

export class CreateClienteDto {
    @IsString()
    @MinLength(3)
    nombre:string

    @IsString()
    @MinLength(3)
    apellido:string


    @IsString()
    @MinLength(3)
    @IsEmail()
    email:string

    @IsString()
    @MinLength(3)
    contrasena:string
}
