import { Body, Controller, Post } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/createAgendamento.dto';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('/agendar')
  async agendar(@Body() agendamento: CreateAgendamentoDto) {
    return await this.agendamentoService.create(agendamento);
  }
}
