import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { cnpj } from 'cpf-cnpj-validator';

@ValidatorConstraint({ name: 'cnpj', async: false })
export class CnpjValid implements ValidatorConstraintInterface {
  validate(cnpjV: string) {
    return cnpj.isValid(cnpjV);
  }

  defaultMessage() {
    return 'CNPJ inválido';
  }
}
