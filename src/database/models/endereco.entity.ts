import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Estabelecimento } from './estabelecimento.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Cliente, (cliente) => cliente.endereco, { nullable: true })
  cliente: Cliente;

  @OneToOne(
    () => Estabelecimento,
    (estabelecimento) => estabelecimento.endereco,
    { nullable: true },
  )
  estabelecimento: Estabelecimento;

  @Column()
  logradouro: string;

  @Column()
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column()
  bairro: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  cep: string;

  @Column({ nullable: true })
  latitude: number;

  @Column({ nullable: true })
  longitude: number;
}
