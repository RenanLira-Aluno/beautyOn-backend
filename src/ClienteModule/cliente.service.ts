import { Injectable } from '@nestjs/common';



@Injectable()
export class ClienteService {
  constructor(private readonly prisma) {}

}
