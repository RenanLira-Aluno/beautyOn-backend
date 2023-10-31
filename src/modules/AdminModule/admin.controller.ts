import { Body, Controller, Get, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { createCategoriaServicoDTO } from './schemas/categoria.schema';

@Controller(`admin`)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post(`categoria`)
  async createCategoriaServico(@Body() createDto: createCategoriaServicoDTO) {
    const categoriaServico =
      await this.adminService.createCategoriaServico(createDto);

    return categoriaServico;
  }

  @Get(`categoria`)
  async allCategoriaServico() {
    const categoriaServico = await this.adminService.allCategoriaServico();

    return categoriaServico;
  }
}
