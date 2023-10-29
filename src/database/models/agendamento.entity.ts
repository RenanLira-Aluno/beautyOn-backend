import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { ServicoEstabelecimento } from "./ServicoEstabelecimento.entity";
import { Profissional } from "./profissional.entity";

@Entity()
export class Agendamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos, {nullable: false})
    cliente: Cliente;

    @ManyToOne(() => ServicoEstabelecimento, (servicoEstabelecimento) => servicoEstabelecimento.agendamentos, {nullable: false})
    servico: ServicoEstabelecimento;

    @ManyToOne(() => Profissional, (profissional) => profissional.agendamentos, {nullable: false})
    profissional: Profissional;

    @Column({type: 'date'})
    data: string;

    @Column({nullable: false})
    hora: string;

    @Column({default: 'pendente'})
    status: string;
    

}