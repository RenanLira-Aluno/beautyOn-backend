import { Controller } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';

@Controller('estabelecimentos')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}
}
