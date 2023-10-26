import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Cliente, Prisma } from '@prisma/client';

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.ClienteWhereUniqueInput,
  ): Promise<Cliente | null> {
    return this.prisma.cliente.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(data: Prisma.ClienteCreateInput): Promise<Cliente> {
    return this.prisma.cliente.create({
      data,
    });
  }
}
