import { Controller, Get, Param } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';

@Controller('estabelecimentos')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}

  @Get('/:id')
  async estabelecimento(@Param('id') id: string) {
    return this.estaService.findOne({
      id,
    });
  }

  @Get('/')
  async estabelecimentos() {
    return this.estaService.findAll();
  }
}
