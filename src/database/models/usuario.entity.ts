import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Endereco } from './endereco.entity';
import { IsEmail, IsMobilePhone, IsNotEmpty } from 'class-validator';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'discriminator' } })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Endereco, (endereco) => endereco.usuario, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  endereco?: Endereco;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  discriminator?: string

  @Column({})
  @IsNotEmpty()
  senha: string;

  @Column({ unique: true })
  @IsMobilePhone('pt-BR')
  telefone: string;

  @Column({ nullable: true })
  fotoPerfil: string;
}
