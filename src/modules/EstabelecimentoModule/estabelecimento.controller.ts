import { Body, Controller, Get, Post } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';

@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}

  @Get(``)
  async findAll() {
    const estabelecimentos = await this.estaService.findAll();

    return estabelecimentos;
  }

  @Post(`:nomeEmpresa/servico`)
  async createServico(
    @Body() servicoDto: ServicoEstabelecimento
  ) {
    const servico = await this.estaService.createServico(servicoDto);

    return servico;
  }
}
