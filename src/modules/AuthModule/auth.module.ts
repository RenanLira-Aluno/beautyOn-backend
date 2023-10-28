import { Module } from '@nestjs/common';
import { ClienteModule } from '../ClienteModule/cliente.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EstabelecimentoModule } from '../EstabelecimentoModule/estabelecimento.module';

@Module({
  imports: [ClienteModule, EstabelecimentoModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
