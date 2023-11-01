import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  nome: string;

  @Column({ nullable: false })
  @IsEmail()
  email: string;

  @Column({ nullable: false })
  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  senha: string;
}
