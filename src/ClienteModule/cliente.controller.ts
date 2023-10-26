import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('/:email')
  async cliente(@Param('email') email: string) {
    return this.clienteService.findOne({
      email,
    });
  }

  @Post('create/cliente')
  async createCliente(
    @Body()
    clienteData: {
      nome: string;
      email: string;
      telefone: string;
      senha: string;
    },
  ) {
    return this.clienteService.create(clienteData);
  }
}
