import { Injectable } from '@nestjs/common';

@Injectable()
export class EstabelecimentoService {
  constructor(private readonly estabelecimentoRepository) {}
}
