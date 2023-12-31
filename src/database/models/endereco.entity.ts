import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { IsLatitude, IsLongitude } from 'class-validator';

@Entity()
export class Endereco {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Usuario, (usuario) => usuario.endereco)
  usuario: Usuario;

  @Column({ nullable: false })
  logradouro: string;

  @Column({ nullable: false })
  numero: string;

  @Column({ nullable: true })
  complemento: string;

  @Column({ nullable: false })
  bairro: string;

  @Column({ nullable: false })
  cidade: string;

  @Column({ nullable: false })
  estado: string;

  @Column({ nullable: false })
  cep: string;

  @Column({ nullable: false, type: 'float' })
  @IsLatitude()
  latitude: number;

  @Column({ nullable: false, type: 'float' })
  @IsLongitude()
  longitude: number;
}
