import { Module } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { EstabelecimentoController } from './estabelecimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';
import { Type } from 'class-transformer';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estabelecimento, ServicoEstabelecimento])],
  controllers: [EstabelecimentoController],
  providers: [EstabelecimentoService],
  exports: [EstabelecimentoService],
})
export class EstabelecimentoModule {}
