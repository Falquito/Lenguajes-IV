import { IsArray, IsEmail, IsPositive, IsString, MinLength } from "class-validator";

export class CreateOrdeneDto {
    @IsString()
    @MinLength(4)
    fecha:string

    @IsEmail()
    @IsString()
    email_client:string

    @IsPositive()
    total:number

    @IsArray()
    productos:Array<object>
}
