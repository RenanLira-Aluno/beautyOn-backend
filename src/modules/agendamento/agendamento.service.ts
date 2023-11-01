import { Injectable } from '@nestjs/common';
import { Agendamento } from 'src/database/models/agendamento.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AgendamentoService {
  constructor(private agendamentoRepository: Repository<Agendamento>) {}
}
