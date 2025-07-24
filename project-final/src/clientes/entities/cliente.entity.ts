import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn("identity")
    id:number
    
    @Column("text")
    nombre:string

    @Column("text")
    apellido:string

    @Column("text")
    email:string

    @Column("text")
    contrasena:string

    @Column("bool",{default:true})
    IsActive:boolean

}
