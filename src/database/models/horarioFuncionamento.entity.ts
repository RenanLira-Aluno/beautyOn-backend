import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Estabelecimento } from './estabelecimento.entity';
import { IsInt, IsMilitaryTime, Max, Min } from 'class-validator';

@Entity()
export class HorarioFuncionamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.horariosFuncionamento,
  )
  estabelecimento: Estabelecimento;

  @IsInt()
  @Min(0)
  @Max(6)
  @Column({ type: 'int' })
  diaSemana: number;

  @IsMilitaryTime({})
  @Column()
  horaAbertura: string;

  @IsMilitaryTime({})
  @Column()
  horaFechamento: string;
}
