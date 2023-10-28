import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';
import { Repository } from 'typeorm';
import { CreateEstabelecimentoDTO } from './schemas/estabelecimento.schema';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentoRepo: Repository<Estabelecimento>,
  ) {}

  async create(entity: CreateEstabelecimentoDTO) {
    const estabelecimento = await this.estabelecimentoRepo.save(entity);

    return estabelecimento;
  }
}
