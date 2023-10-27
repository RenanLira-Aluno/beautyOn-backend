import { Module } from '@nestjs/common';
import { ClienteModule } from '../ClienteModule/cliente.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [ClienteModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
