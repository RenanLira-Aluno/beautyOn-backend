import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';

@Controller('estabelecimentos')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}

  @Get(``)
  async findAll() {
    const estabelecimentos = await this.estaService.findAll();

    return estabelecimentos;
  }

  @Get(`/proximos`)
  async findProximos(@Query('lat') lat: number, @Query('long') long: number) {
    if (!lat || !long)
      return { message: 'É necessário informar a latitude e longitude' };

    const estabelecimentos = await this.estaService.findProximos(lat, long);

    return estabelecimentos;
  }

  @Post(`:nomeEmpresa/servico`)
  async createServico(@Body() servicoDto: ServicoEstabelecimento) {
    const servico = await this.estaService.createServico(servicoDto);

    return servico;
  }
}
