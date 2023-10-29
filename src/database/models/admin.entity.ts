import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column({nullable: false})
    nome: string

    @Column({nullable: false})
    email: string

    @Column({nullable: false})
    senha: string
}