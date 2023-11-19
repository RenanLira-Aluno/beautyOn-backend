import { Usuario } from "src/database/models/usuario.entity";

export interface UserFromJwt extends Pick<Usuario, "id" | "discriminator" | "email"> {}