import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cliente } from "./cliente.entity";
import { ServicoEstabelecimento } from "./ServicoEstabelecimento.entity";
import { Profissional } from "./profissional.entity";

@Entity()
export class Agendamento {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.agendamentos)
    cliente: Cliente;

    @ManyToOne(() => ServicoEstabelecimento, (servicoEstabelecimento) => servicoEstabelecimento.agendamentos)
    servico: ServicoEstabelecimento;

    @ManyToOne(() => Profissional, (profissional) => profissional.agendamentos)
    profissional: Profissional;

    @Column()
    data: string;

    @Column()
    hora: string;

    @Column()
    status: string;
    

}