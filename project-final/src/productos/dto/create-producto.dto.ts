import { IsInt, IsNumber, IsPositive, IsString, Length, Min, MinLength } from "class-validator"

export class CreateProductoDto {
    @IsString()
    @MinLength(3)
    nombre:string


    @IsNumber()
    @IsPositive()
    precio:number


    @IsInt()
    @IsPositive()
    stock:number


    @IsString()
    categoria:string

    @IsString()
    descripcion:string
}
