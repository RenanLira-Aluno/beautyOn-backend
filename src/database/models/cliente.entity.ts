import { ChildEntity, Column, OneToMany } from 'typeorm';
import { Usuario } from './usuario.entity';
import { Agendamento } from './agendamento.entity';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@ChildEntity()
export class Cliente extends Usuario {
  @Column({ nullable: false })
  @IsNotEmpty()
  primeiroNome: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  segundoNome: string;

  @Column({ nullable: true })
  @IsLatitude()
  @IsOptional()
  lat?: number;

  @Column({ nullable: true })
  @IsLongitude()
  @IsOptional()
  long?: number;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente, {
    nullable: true,
  })
  agendamentos: Agendamento[];
}
