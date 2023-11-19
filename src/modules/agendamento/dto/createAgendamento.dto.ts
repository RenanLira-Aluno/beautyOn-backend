import { OmitType } from '@nestjs/mapped-types';
import { Agendamento } from 'src/database/models/agendamento.entity';

export class CreateAgendamentoDto extends OmitType(Agendamento, [
  'status',
  'id',
  `cliente`
]) {}
