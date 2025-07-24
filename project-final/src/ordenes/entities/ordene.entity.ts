import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ordene {
    @PrimaryGeneratedColumn("identity")
    id:number

    @Column("text")
    email_client

    @Column("date")
    fecha:string

    @Column({
        type:"text",
        array:true
    })
    productos:object[]

    @Column("float")
    total:number

    @Column("bool",{default:true})
    IsActive:boolean


}
