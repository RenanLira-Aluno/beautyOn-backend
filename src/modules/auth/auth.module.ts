import { Module } from '@nestjs/common';
import { ClienteModule } from '../cliente/cliente.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EstabelecimentoModule } from '../estabelecimento/estabelecimento.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    ClienteModule,
    EstabelecimentoModule,
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
