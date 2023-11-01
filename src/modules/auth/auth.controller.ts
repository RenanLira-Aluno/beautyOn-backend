import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClienteDto } from './schemas/login.schema';
import { CreateClienteDto } from '../cliente/schemas/cliente.schema';
import { CreateEstabelecimentoDTO } from '../estabelecimento/schemas/estabelecimento.schema';
import { FastifyRequest } from 'fastify';
import { createWriteStream } from 'fs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(200)
  @Post('login')
  async signIn(@Body() loginClienteDto: LoginClienteDto) {
    const cliente = await this.authService.signIn(
      loginClienteDto.email,
      loginClienteDto.senha,
    );

    const payload = { sub: cliente.id, username: cliente.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  @HttpCode(201)
  @Post('signup')
  async signUp(@Body() cliente: CreateClienteDto) {
    const res = await this.authService.signUp(cliente);

    return res;
  }

  @Post('/upload/fotoPerfil')
  async uploadFotoPerfil(@Request() req: FastifyRequest) {
    const part = await req.file({});

    const file = createWriteStream(`./uploads/${part.filename}`);

    part.file.pipe(file);

    return { message: 'Foto de perfil enviada com sucesso' };
  }

  @Post('signup-estabelecimento')
  async signUpEstabelecimento(
    @Body() estabelecimento: CreateEstabelecimentoDTO,
  ) {
    const res = await this.authService.signUpEstabelecimento(estabelecimento);

    return res;
  }
}