import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArrayMinSize, IsDefined } from 'class-validator';
import { Endereco } from './endereco.entity';
import { HorarioFuncionamento } from './horarioFuncionamento.entity';

@Entity()
export class Estabelecimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Endereco, (endereco) => endereco.estabelecimento, {
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  @IsDefined({ message: 'Endereço é obrigatório' })
  endereco: Endereco;

  @OneToMany(() => HorarioFuncionamento, (horario) => horario.estabelecimento, {
    cascade: true,
    nullable: false,
  })
  @ArrayMinSize(2, {
    message: 'É necessário ter pelo menos 2 horários de funcionamento',
  })
  horariosFuncionamento: HorarioFuncionamento[];

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  telefone: string;

  @Column()
  email: string;

  @Column({ select: false })
  senha: string;

  @Column({ nullable: true })
  cnpj: string;
}
