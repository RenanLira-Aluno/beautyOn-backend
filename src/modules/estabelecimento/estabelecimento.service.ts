import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';
import { Like, Repository } from 'typeorm';
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
    const estabelecimentos = await this.estabelecimentoRepo.find({
      relations: { endereco: true, servicos: true },
    });

    return estabelecimentos;
  }

  async findFilter(nome?: string, tipoServico?: string) {
    const estabelecimentos = await this.estabelecimentoRepo.find({
      where: {
        nomeEmpresa: Like(`%${nome ?? ''}%`),
        servicos: { categoriaCodigo: tipoServico ?? tipoServico },
      },
      relations: { endereco: true, servicos: true },
      take: 5,
    });

    return estabelecimentos;
  }

  async getProfissional(id: string) {
    const estabelecimento = await this.estabelecimentoRepo.findOne({
      where: { profissionais: { id } },
      relations: { profissionais: true },
    });

    return estabelecimento.profissionais;
  }

  async findProximos(
    latitude: number,
    longitude: number,
    distancia: number = 5,
    limit: number = 10,
  ) {
    const proximos = await this.estabelecimentoRepo
      .createQueryBuilder('estabelecimento')
      .innerJoinAndSelect('estabelecimento.endereco', 'endereco')
      .addSelect(
        `
            6371 * acos(
                cos(radians(${latitude})) * cos(radians(endereco.latitude))
                * cos(radians(endereco.longitude) - radians(${longitude}))
                + sin(radians(${latitude})) * sin(radians(endereco.latitude))
            )
        `,
        'distancia',
      )
      .where(`distancia < ${distancia}`)
      .orderBy('distancia')
      .limit(limit)
      .getMany();

    return proximos;
  }
}
