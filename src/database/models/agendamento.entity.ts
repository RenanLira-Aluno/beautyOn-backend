import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { ServicoEstabelecimento } from './ServicoEstabelecimento.entity';
import { Profissional } from './profissional.entity';
import { IsDateString, IsEnum, IsMilitaryTime } from 'class-validator';

@Entity()
export class Agendamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, {
    nullable: false,
  })
  cliente: Cliente;

  @ManyToOne(
    () => ServicoEstabelecimento,
    (servicoEstabelecimento) => servicoEstabelecimento.agendamentos,
    { nullable: false },
  )
  servico: ServicoEstabelecimento;

  @ManyToOne(() => Profissional, (profissional) => profissional.agendamentos, {
    nullable: false,
  })
  profissional: Profissional;

  @Column({ type: 'date' })
  @IsDateString({ strict: true })
  data: string;

  @Column({ nullable: false })
  @IsMilitaryTime()
  hora: string;

  @Column({ default: 'pendente' })
  @IsEnum(['pendente', 'confirmado', 'cancelado'])
  status: string;
}
