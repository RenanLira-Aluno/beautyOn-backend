import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { Endereco } from 'src/database/models/endereco.entity';
import { Estabelecimento } from 'src/database/models/estabelecimento.entity';

export class CreateEstabelecimentoDTO extends OmitType(Estabelecimento, [
  'id',
]) {
  @IsNotEmpty()
  endereco?: Endereco;
}
