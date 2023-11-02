import { Body, Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClienteDto } from './dto/login.schema';
import { CreateClienteDto } from '../cliente/schemas/cliente.schema';
import { CreateEstabelecimentoDTO } from '../estabelecimento/schemas/estabelecimento.schema';
import { FastifyRequest } from 'fastify';
import { createWriteStream } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest.model';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
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
