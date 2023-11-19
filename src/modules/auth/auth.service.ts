import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../cliente/cliente.service';
import * as bcrypt from 'bcryptjs';
import { CreateClienteDto } from '../cliente/schemas/cliente.schema';
import { CreateEstabelecimentoDTO } from '../estabelecimento/schemas/estabelecimento.schema';
import { EstabelecimentoService } from '../estabelecimento/estabelecimento.service';
import { Usuario } from 'src/database/models/usuario.entity';
import { Cliente } from 'src/database/models/cliente.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserTokenResponse } from './models/userToken';
import { UsuarioService } from '../usuario/usuario.service';
import { UserFromJwt } from './models/UserFromJwt';

@Injectable()
export class AuthService {
  constructor(
    private clienteService: ClienteService,
    private estabelecimentoService: EstabelecimentoService,
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) { }

  async login(user: Usuario): Promise<UserTokenResponse> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      tipo: user.discriminator,
    }

    const jwt = this.jwtService.sign(payload)

    return {
      access_token: jwt
    }



  }

  async signUp(createClienteDto: CreateClienteDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(createClienteDto.senha, salt);

    createClienteDto.senha = hash;

    const cliente = await this.clienteService.create(createClienteDto);

    return {
      message: 'Cliente cadastrado com sucesso',
    }
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

  async validateUser(email: string, senha: string) {
    const cliente = await this.usuarioService.findOne(email);

    if (cliente) {
      const match = await bcrypt.compare(senha, cliente.senha);

      if (match) {
        return {
          ...cliente,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedException(`email ou senha inválidos`);
  }

  async getMe(user: UserFromJwt) {
    return await this.usuarioService.getUsuarioById(user.id, user.discriminator)
  }
}
