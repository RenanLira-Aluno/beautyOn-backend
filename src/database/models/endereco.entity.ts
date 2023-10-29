import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario

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
