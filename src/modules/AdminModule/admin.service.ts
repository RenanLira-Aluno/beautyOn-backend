import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "src/database/models/admin.entity";
import { CategoriaServico } from "src/database/models/categoriaServico.entity";
import { Repository } from "typeorm";
import { createCategoriaServicoDTO } from "./schemas/categoria.schema";

@Injectable()
export class AdminService {

    constructor(
        @InjectRepository(Admin)
        private adminRepository: Repository<Admin>,
        @InjectRepository(CategoriaServico)
        private categoriaServicoRepository: Repository<CategoriaServico>,
    ){}

    async allCategoriaServico() {
        const categoriaServico = await this.categoriaServicoRepository.find();

        return categoriaServico;
    }

    async createCategoriaServico(entity: createCategoriaServicoDTO) {

        const categoriaServico = await this.categoriaServicoRepository.save(entity);

        return categoriaServico;
    }

}