import { OmitType } from "@nestjs/mapped-types";
import { Admin } from "src/database/models/admin.entity";

export class CreateAdminDto extends OmitType(Admin, [`id`, `discriminator`,`fotoPerfil`]){}