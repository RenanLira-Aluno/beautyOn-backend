import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "src/database/models/usuario.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ) { }


    async getUsuarioById(id: string, tipo: string): Promise<Usuario> {
        const user = await this.usuarioRepository.findOne({ where: { id: id, discriminator: tipo } })

        return {...user, senha: undefined, discriminator: undefined}
    }

    async findOne(email: string): Promise<Usuario> {
        return await this.usuarioRepository.findOne({
            where: { email },
        });
    }
}