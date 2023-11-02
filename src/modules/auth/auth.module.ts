import { Module } from '@nestjs/common';
import { ClienteModule } from '../cliente/cliente.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    ClienteModule,
    EstabelecimentoModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
