import { FastifyRequest } from 'fastify';
import { Usuario } from 'src/database/models/usuario.entity';
import { UserFromJwt } from './UserFromJwt';

export interface AuthRequest extends FastifyRequest {
    user: Usuario
}