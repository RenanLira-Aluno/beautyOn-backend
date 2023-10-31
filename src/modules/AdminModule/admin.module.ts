import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Type } from "class-transformer";
import { Admin } from "src/database/models/admin.entity";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { CategoriaServico } from "src/database/models/categoriaServico.entity";


@Module({
    imports: [TypeOrmModule.forFeature([Admin, CategoriaServico])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}