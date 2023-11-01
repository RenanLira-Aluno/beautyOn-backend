import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import * as bcrypt from 'bcryptjs';
import { CreateClienteDto } from '../cliente/schemas/cliente.schema';
import { CreateEstabelecimentoDTO } from '../estabelecimento/schemas/estabelecimento.schema';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';

@Injectable()
export class AuthService {
  constructor(
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService,
  ) {}

  async signIn(email: string, senha: string) {
    const cliente = await this.clienteService.findOne(email);

    const match = await bcrypt.compare(senha, cliente.senha);

    if (cliente && match) {
      return cliente;
    }

    throw new UnauthorizedException();
  }

  async signUp(createClienteDto: CreateClienteDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createClienteDto.senha, salt);

    createClienteDto.senha = hash;

    const cliente = await this.clienteService.create(createClienteDto);

    return cliente;
  }

  async signUpEstabelecimento(
    createEstabelecimentoDto: CreateEstabelecimentoDTO,
  ) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createEstabelecimentoDto.senha, salt);

    const profissionais = createEstabelecimentoDto.profissionais.map(
      (profissional) => {
        const salt = bcrypt.genSaltSync(10);
        profissional.senha = bcrypt.hashSync(profissional.senha, salt);
        return profissional;
      },
    );

    createEstabelecimentoDto.profissionais = profissionais;

    createEstabelecimentoDto.senha = hash;

    const estabelecimento = await this.estabelecimentoService.create(
      createEstabelecimentoDto,
    );

    return estabelecimento;
  }
}
