import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Endereco } from "./endereco.entity";
import { IsEmail, IsMobilePhone, isMobilePhone } from "class-validator";

@Entity()
@TableInheritance({ column: { type: "varchar", name: "discriminator" }})
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => Endereco, (endereco) => endereco.usuario, {
        nullable: true,
        cascade: true,
    })
    @JoinColumn()
    endereco?: Endereco;

    @Column()
    nome: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ select: false })
    senha: string;

    @Column({ unique: true })
    @IsMobilePhone('pt-BR')
    telefone: string;

}