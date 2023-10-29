import { Controller, Get } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';

@Controller('estabelecimento')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}

  @Get(``)
  async findAll() {
    const estabelecimentos = await this.estaService.findAll();

    return estabelecimentos;
  }
}
