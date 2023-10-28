import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClienteDto } from './schemas/login.schema';
import { CreateClienteDto } from '../ClienteModule/schemas/cliente.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() loginClienteDto: LoginClienteDto) {
    return await this.authService.signIn(
      loginClienteDto.email,
      loginClienteDto.senha,
    );
  }

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() cliente: CreateClienteDto) {
    const res = await this.authService.signUp(cliente);

    return res;
  }
}
