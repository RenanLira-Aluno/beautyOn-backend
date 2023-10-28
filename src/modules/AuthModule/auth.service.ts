import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../ClienteModule/cliente.service';
import * as bcrypt from 'bcryptjs';
import { CreateClienteDto } from '../ClienteModule/schemas/cliente.schema';

@Injectable()
export class AuthService {
  constructor(private clienteService: ClienteService) {}

  async signIn(email: string, senha: string) {
    const cliente = await this.clienteService.findOne(email);
    const match = await bcrypt.compare(senha, cliente.senha);

    if (cliente && match) {
      return cliente;
    }

    throw new UnauthorizedException();
  }

  async signUp(createClienteDto: CreateClienteDto) {
    const cliente = await this.clienteService.createCliente(createClienteDto);

    return cliente;
  }
}
