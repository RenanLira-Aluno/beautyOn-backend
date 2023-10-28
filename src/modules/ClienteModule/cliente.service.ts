import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/database/models/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from './schemas/cliente.schema';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepo: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepo.find({ relations: { endereco: true } });
  }

  async findOne(email: string): Promise<Cliente> {
    return await this.clienteRepo.findOne({
      where: { email },
      select: ['email', 'senha'],
    });
  }

  async create(cliente: CreateClienteDto): Promise<Cliente> {
    return await this.clienteRepo.save(cliente);
  }
}
