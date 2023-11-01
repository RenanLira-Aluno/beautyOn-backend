import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ServicoEstabelecimento } from './ServicoEstabelecimento.entity';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class CategoriaServico {
  @PrimaryColumn({ unique: true, nullable: false })
  @IsNotEmpty()
  codigo: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  nome: string;

  @Column({ nullable: false })
  @IsNotEmpty()
  descricao: string;

  @OneToMany(
    () => ServicoEstabelecimento,
    (servicoEstabelecimento) => servicoEstabelecimento.categoria,
  )
  servicos: ServicoEstabelecimento[];
}
