import { Injectable } from '@nestjs/common';
import { Agendamento } from 'src/database/models/agendamento.entity';
import { Repository } from 'typeorm';
import { CreateAgendamentoDto } from './dto/createAgendamento.dto';
import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { Action } from 'src/enums/Action.enum';
import { Usuario } from 'src/database/models/usuario.entity';

@Injectable()
export class AgendamentoService {
  constructor(
    @InjectRepository(Agendamento)
    private agendamentoRepository: Repository<Agendamento>,
    @InjectRepository(ServicoEstabelecimento)
    private servicoEstaRepository: Repository<ServicoEstabelecimento>,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async create(user: Usuario, agendamento: CreateAgendamentoDto) {
    // const servico = await this.servicoEstaRepository.findOne({
    //   where: { id: agendamento.servicoId },
    //   relations: { estabelecimento: true, profissionais: true },
    // });

    console.log(user)
    
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(ability.can(Action.Read, Agendamento));



    // return ability.can(Action.Read, Agendamento);
  }
}
