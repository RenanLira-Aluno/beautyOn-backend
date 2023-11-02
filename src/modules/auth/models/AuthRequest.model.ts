import { FastifyRequest } from 'fastify';
import { Usuario } from 'src/database/models/usuario.entity';

export interface AuthRequest extends FastifyRequest {
    user: Usuario
}