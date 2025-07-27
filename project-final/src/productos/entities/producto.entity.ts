import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producto {
    @PrimaryGeneratedColumn("identity")
    id:number
    @Column("text")
    nombre:string

    @Column("float")
    precio:number


    @Column("int",{default:0})
    stock:number

    @Column("text")
    categoria:string

    @Column("text")
    descripcion:string

    @Column("bool",{default:true})
    IsActive:boolean
    @Column("int",{default:0})
    descuento:number
    
}
