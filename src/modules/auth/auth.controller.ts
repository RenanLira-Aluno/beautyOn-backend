import { Body, Controller, Get, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginClienteDto } from './dto/login.schema';
import { CreateClienteDto } from '../cliente/schemas/cliente.schema';
import { CreateEstabelecimentoDTO } from '../estabelecimento/schemas/estabelecimento.schema';
import { FastifyRequest } from 'fastify';
import { createWriteStream } from 'fs';
import { JwtService } from '@nestjs/jwt';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest.model';
import { IsPublic } from './decorators/is-public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import { Usuario } from 'src/database/models/usuario.entity';
import { UserFromJwt } from './models/UserFromJwt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @HttpCode(200)
  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }

  @HttpCode(201)
  @Post('signup')
  @IsPublic()
  async signUp(@Body() cliente: CreateClienteDto) {
    const res = await this.authService.signUp(cliente);

    return res;
  }

  @Get('me')
  async getMe(@CurrentUser() user: UserFromJwt) {
    console.log(user)
    return await this.authService.getMe(user);

  }

  @Post('/upload/fotoPerfil')
  async uploadFotoPerfil(@Request() req: FastifyRequest) {
    const part = await req.file({});

    const file = createWriteStream(`./uploads/${part.filename}`);

    part.file.pipe(file);

    return { message: 'Foto de perfil enviada com sucesso' };
  }

  @Post('signup-estabelecimento')
  @IsPublic()
  async signUpEstabelecimento(
    @Body() estabelecimento: CreateEstabelecimentoDTO,
  ) {
    const res = await this.authService.signUpEstabelecimento(estabelecimento);

    return res;
  }
}
