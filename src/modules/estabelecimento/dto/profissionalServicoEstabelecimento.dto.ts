import { ArrayMinSize, IsArray, IsUUID } from 'class-validator';

export class ProfissinalServicoEstabelecimentoDto {
  @IsArray()
  @ArrayMinSize(1)
  profissional: string[];

  @IsUUID()
  servico: string;
}
