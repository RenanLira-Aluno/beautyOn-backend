import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario

  @Column({nullable: false})
  logradouro: string;

  @Column({nullable: false})
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({nullable: false})
  bairro: string;

  @Column({nullable: false})
  cidade: string;

  @Column({nullable: false})
  estado: string;

  @Column({nullable: false})
  cep: string;

  @Column({ nullable: true, type: 'float' })
  latitude?: number;

  @Column({ nullable: true, type: 'float' })
  longitude?: number;
}
