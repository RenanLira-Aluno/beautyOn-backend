import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './endereco.entity';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Endereco, (endereco) => endereco.cliente, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn()
  endereco?: Endereco;

  @Column()
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  senha: string;

  @Column({ unique: true })
  telefone: string;

  @Column({ nullable: true })
  lat?: number;

  @Column({ nullable: true })
  long?: number;
}
