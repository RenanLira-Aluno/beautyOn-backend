import { ChildEntity, Column, OneToMany } from 'typeorm';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  Validate,
} from 'class-validator';

import { HorarioFuncionamento } from './horarioFuncionamento.entity';
import { Usuario } from './usuario.entity';
import { Profissional } from './profissional.entity';
import { ServicoEstabelecimento } from './ServicoEstabelecimento.entity';
import { CnpjValid } from 'src/validations/cnpj.validator';

@ChildEntity()
export class Estabelecimento extends Usuario {
  @OneToMany(() => HorarioFuncionamento, (horario) => horario.estabelecimento, {
    cascade: true,
    nullable: false,
  })
  @ArrayMinSize(2, {
    message: 'É necessário ter pelo menos 2 horários de funcionamento',
  })
  horariosFuncionamento: HorarioFuncionamento[];

  @OneToMany(
    () => Profissional,
    (profissional) => profissional.estabelecimento,
    { nullable: false, cascade: ['insert'] },
  )
  @ArrayMinSize(1, {
    message: 'É necessário ter pelo menos 1 profissional',
  })
  profissionais: Profissional[];

  @OneToMany(
    () => ServicoEstabelecimento,
    (servico) => servico.estabelecimento,
    { nullable: false, cascade: true },
  )
  @ArrayMinSize(1, {
    message: 'É necessário ter pelo menos 1 serviço',
  })
  servicos: ServicoEstabelecimento[];

  @Column({ nullable: false })
  @IsNotEmpty()
  nomeEmpresa: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  descricao: string;

  @Column({ nullable: true })
  @Validate(CnpjValid)
  @IsOptional()
  cnpj?: string;
}
