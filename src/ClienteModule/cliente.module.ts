import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { PrismaService } from 'src/prisma.service';
import { ClienteController } from './cliente.controller';

@Module({
  imports: [],
  providers: [ClienteService, PrismaService],
  controllers: [ClienteController],
})
export class ClienteModule {}
