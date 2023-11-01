import { Controller, Post } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';

@Controller('agendamentos')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('/agendar')
  async agendar(): Promise<any> {}
}
