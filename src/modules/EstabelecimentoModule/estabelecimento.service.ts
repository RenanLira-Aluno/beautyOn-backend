import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';
import { Repository } from 'typeorm';
import { CreateEstabelecimentoDTO } from './schemas/estabelecimento.schema';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentoRepo: Repository<Estabelecimento>,
    @InjectRepository(ServicoEstabelecimento)
    private readonly servicoRepo: Repository<ServicoEstabelecimento>,
  ) {}

  async create(entity: CreateEstabelecimentoDTO) {
    const estabelecimento = await this.estabelecimentoRepo.save(entity);

    return estabelecimento;
  }

  async createServico(entity: ServicoEstabelecimento) {
    const servico = await this.servicoRepo.save(entity);

    return servico;
  }

  async findAll() {
    const estabelecimentos = await this.estabelecimentoRepo.find({relations: {profissionais: true, servicos: true, endereco: true, horariosFuncionamento: true}});

    return estabelecimentos;
  }
}
