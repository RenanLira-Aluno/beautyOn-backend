import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EstabelecimentoService } from './estabelecimento.service';
// import { ServicoEstabelecimento } from 'src/database/models/ServicoEstabelecimento.entity';
import { ProfissinalServicoEstabelecimentoDto } from './dto/profissionalServicoEstabelecimento.dto';

@Controller('estabelecimentos')
export class EstabelecimentoController {
  constructor(private readonly estaService: EstabelecimentoService) {}

  @Get(``)
  async findAll(
    @Query('porNome') nome?: string,
    @Query('tipoServico') tipoServico?: string[],
  ) {
    if (nome || tipoServico) {
      const estabelecimentos = await this.estaService.findFilter(
        nome,
        tipoServico,
      );

      return estabelecimentos;
    }
    const estabelecimentos = await this.estaService.findAll();

    return estabelecimentos;
  }

  @Get(`/proximos`)
  async findProximos(
    @Query('lat') lat: number,
    @Query('long') long: number,
    @Query('distancia') distancia?: number,
    @Query('limit') limit?: number,
  ) {
    if (!lat || !long)
      return { message: 'É necessário informar a latitude e longitude' };
    const estabelecimentos = await this.estaService.findProximos(
      lat,
      long,
    );

    return estabelecimentos;
  }

  // @Post(`:nomeEmpresa/servico`)
  // async createServico(@Body() servicoDto: ServicoEstabelecimento) {
  //   const servico = await this.estaService.createServico(servicoDto);

  //   return servico;
  // }

  @Post(`servico/registrarProfissional/`)
  async registrarProfServico(
    @Body() servicoDto: ProfissinalServicoEstabelecimentoDto,
  ) {
    servicoDto.profissional.forEach(async (profissional) => {
      await this.estaService.getProfissional(profissional);
    });
    return {};
  }
}
