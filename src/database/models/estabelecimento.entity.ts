import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Estabelecimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
