import { Controller, Get } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from 'src/database/models/cliente.entity';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('')
  async findAll(): Promise<Cliente[]> {
    return await this.clienteService.findAll();
  }
}
