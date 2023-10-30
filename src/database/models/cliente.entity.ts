import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco.entity';
import { Usuario } from './usuario.entity';
import { Agendamento } from './agendamento.entity';

@ChildEntity()
export class Cliente extends Usuario {

  @Column({nullable: false})
  primeiroNome: string;

  @Column({nullable: false})
  segundoNome: string;
  
  @Column({ nullable: true })
  lat?: number;

  @Column({ nullable: true })
  long?: number;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.cliente, {nullable: true})
  agendamentos: Agendamento[];
}
