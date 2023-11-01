import { Injectable } from '@nestjs/common';
import { Agendamento } from 'src/database/models/agendamento.entity';
import { Repository } from 'typeorm';
import { CreateAgendamentoDto } from './dto/createAgendamento.dto';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(ServicoEstabelecimento)
    private servicoEstaRepository: Repository<ServicoEstabelecimento>,
  ) {}

  async create(agendamento: CreateAgendamentoDto) {
    console.log(agendamento);
    const servico = await this.servicoEstaRepository.findOne({
      where: { id: agendamento.servicoId },
      relations: { estabelecimento: true, profissionais: true },
    });

    return servico;
  }
}
