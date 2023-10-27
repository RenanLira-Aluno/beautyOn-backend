import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { Cliente } from 'src/database/models/cliente.entity';
import { LoginClienteDto, CreateClienteDto } from './schemas/cliente.schema';

@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get('')
  async findAll(): Promise<Cliente[]> {
    return await this.clienteService.findAll();
  }

  @Post('/login')
  async login(@Body() cliente: LoginClienteDto): Promise<Cliente> {
    return await this.clienteService.findOne(cliente.email);
  }

  @Post('/signup')
  async singUp(@Body() cliente: CreateClienteDto): Promise<Cliente> {
    return await this.clienteService.createCliente(cliente);
  }
}
