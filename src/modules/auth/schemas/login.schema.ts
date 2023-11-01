import { Cliente } from 'src/database/models/cliente.entity';

export interface LoginClienteDto extends Pick<Cliente, 'email' | 'senha'> {}
