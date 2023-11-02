import { OmitType } from '@nestjs/mapped-types';
import { Cliente } from 'src/database/models/cliente.entity';

type ByBoolean<T> = {
  [K in keyof T]: T[K] extends Array<infer U> ? ByBoolean<U>[] : boolean;
};


export class CreateClienteDto extends OmitType(Cliente, [`id`]) {}

export const ClienteSelectLogin: ByBoolean<Partial<Cliente>> = {
  email: true,
  senha: true,
  endereco: false,
};
