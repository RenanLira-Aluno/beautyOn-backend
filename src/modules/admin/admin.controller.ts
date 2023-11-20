import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { createCategoriaServicoDTO } from './schemas/categoria.schema';
import { PoliciesGuard } from '../casl/guards/policies-guard.guard';
import { CheckPolicies } from '../casl/decorators/check-policies.decorator';
import { AppAbility } from '../casl/casl-ability.factory';
import { Action } from 'src/enums/Action.enum';
import { CategoriaServico } from 'src/database/models/categoriaServico.entity';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';

@Controller(`admin`)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post(`categoria`)
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => ability.can(Action.Create, CategoriaServico))
  async createCategoriaServico(@Body() createDto: createCategoriaServicoDTO) {
    // console.log(`teste`)
    const categoriaServico =
      await this.adminService.createCategoriaServico(createDto);

    return categoriaServico;
  }

  @Get(`categoria`)
  async allCategoriaServico() {
    const categoriaServico = await this.adminService.allCategoriaServico();

    return categoriaServico;
  }

  @Post(`signUp`)
  @IsPublic()
  async signUp(@Body() createAdminDto: CreateAdminDto) {
    const res = await this.adminService.createAdmin(createAdminDto);

    return res
  }


}
