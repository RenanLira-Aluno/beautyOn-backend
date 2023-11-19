import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ChildEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@ChildEntity()
export class Admin extends Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  primeiroNome: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  segundoNome: string;

  @Column({ nullable: false })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  senha: string;
}
