import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';
import { Agendamento } from 'src/database/models/agendamento.entity';
import { AgendamentoController } from './agendamento.controller';
import { AgendamentoService } from './agendamento.service';

@Module({
  imports: [TypeOrmModule.forFeature([Agendamento, ServicoEstabelecimento])],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}
