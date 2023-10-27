import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../ClienteModule/cliente.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private clienteServices: ClienteService) {}

  async signIn(email: string, senha: string) {
    const cliente = await this.clienteServices.findOne(email);
    const match = await bcrypt.compare(senha, cliente.senha);

    if (cliente && match) {
      return cliente;
    }

    throw new UnauthorizedException();
  }
}
