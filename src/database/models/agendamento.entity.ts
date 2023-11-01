import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ServicoEstabelecimento } from './ServicoEstabelecimento.entity';
import { Profissional } from './profissional.entity';
import {
  IsDateString,
  IsEmpty,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos)
  @IsNotEmpty()
  cliente: Cliente;

  @Column({ nullable: false })
  clienteId: string;

  @ManyToOne(
    () => ServicoEstabelecimento,
    (servicoEstabelecimento) => servicoEstabelecimento.agendamentos,
  )
  @IsNotEmpty()
  servico: ServicoEstabelecimento;

  @Column({ nullable: false })
  servicoId: string;

  @ManyToOne(() => Profissional, (profissional) => profissional.agendamentos)
  profissional: Profissional;

  @Column({ nullable: false })
  @IsOptional()
  profissionalId: string;

  @Column({ type: 'date' })
  @IsDateString({ strict: true })
  data: string;

  @Column({ nullable: false })
  @IsMilitaryTime()
  hora: string;

  @Column({ default: 'pendente' })
  @IsEnum(['pendente', 'confirmado', 'cancelado'])
  @IsEmpty()
  status: string;
}
