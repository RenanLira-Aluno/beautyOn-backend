import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "src/database/models/usuario.entity";
import { UsuarioService } from "./usuario.service";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService],
    controllers: [],
    exports: [UsuarioService]
})
export class UsuarioModule {}