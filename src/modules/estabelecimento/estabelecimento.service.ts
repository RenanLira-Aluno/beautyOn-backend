import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';
import { ArrayContains, ILike, In, Like, Repository } from 'typeorm';
import { CreateEstabelecimentoDTO } from './schemas/estabelecimento.schema';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';

@Injectable()
export class EstabelecimentoService {
  constructor(
    @InjectRepository(Estabelecimento)
    private readonly estabelecimentoRepo: Repository<Estabelecimento>,
    @InjectRepository(ServicoEstabelecimento)
    private readonly servicoRepo: Repository<ServicoEstabelecimento>,
  ) { }

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

  async findFilter(nome?: string, tipoServico?: string[]) {
    console.log(tipoServico)
    const estabelecimentos = await this.estabelecimentoRepo.find({
      where:
        {
          nomeEmpresa: ILike(`%${nome ?? ''}%`),
          servicos: {categoriaCodigo: tipoServico ? In(tipoServico) : Like('%%')}
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
    tipoServico?: string[],
    distancia?: number,
    limit?: number,
  ) {

    console.log(tipoServico ? tipoServico : ['%%'])

    const proximos = await this.estabelecimentoRepo
      .createQueryBuilder('estabelecimento')
      .innerJoinAndSelect('estabelecimento.endereco', 'endereco')
      .innerJoinAndSelect('estabelecimento.servicos', 'servicos')
      .where(
        `
            6371 * acos(
                cos(radians(${latitude})) * cos(radians(endereco.latitude))
                * cos(radians(endereco.longitude) - radians(${longitude}))
                + sin(radians(${latitude})) * sin(radians(endereco.latitude))
            ) < :dis
        `, { dis: distancia ?? 5 }
      )
      .andWhere(`servicos.categoriaCodigo LIKE ANY (ARRAY[:...tipoServico])`, { tipoServico: tipoServico ? tipoServico : ['%%'] })
      .orderBy(`6371 * acos(
        cos(radians(${latitude})) * cos(radians(endereco.latitude))
        * cos(radians(endereco.longitude) - radians(${longitude}))
        + sin(radians(${latitude})) * sin(radians(endereco.latitude))
        )`)
      .limit(limit ?? 10)
      .getMany();

    return proximos;
  }
}
