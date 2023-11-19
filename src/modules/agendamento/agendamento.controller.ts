import { Body, Controller, Post, Req } from '@nestjs/common';
import { AgendamentoService } from './agendamento.service';
import { CreateAgendamentoDto } from './dto/createAgendamento.dto';
import { AuthRequest } from '../auth/models/AuthRequest.model';

@Controller('agendamento')
export class AgendamentoController {
  constructor(private readonly agendamentoService: AgendamentoService) {}

  @Post('/agendar')
  async agendar(@Req() request: AuthRequest, @Body() agendamento: any) {

    return await this.agendamentoService.create(request.user, agendamento);
  }
}
