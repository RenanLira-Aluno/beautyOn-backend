import { OmitType } from '@nestjs/mapped-types';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';

export class CreateEstabelecimentoDTO extends OmitType(Estabelecimento, [
  'id',
]) {}
