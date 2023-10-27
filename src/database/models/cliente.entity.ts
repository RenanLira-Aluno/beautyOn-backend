import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
