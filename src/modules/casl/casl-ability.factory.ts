import { AbilityBuilder, AbilityClass, ConditionsMatcher, ExtractSubjectType, InferSubjects, MatchConditions, PureAbility } from "@casl/ability";
import { Agendamento } from "src/database/models/agendamento.entity";
import { Action } from "src/enums/Action.enum";
import { UserFromJwt } from "../auth/models/UserFromJwt";
import { Usuario } from "src/database/models/usuario.entity";

type Subjects = InferSubjects<typeof Agendamento | typeof Usuario> | 'all';
const lambdaMatcher: ConditionsMatcher<MatchConditions> = matchConditions => matchConditions;
export type AppAbility = PureAbility<[Action, Subjects]>;
export class CaslAbilityFactory {
    createForUser(user: Usuario) {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[Action, Subjects]>>(PureAbility as AbilityClass<AppAbility>);

        if (user.discriminator === 'Admin') {
            can(Action.Manage, 'all');
        }

        if (user.discriminator === 'Cliente') {
            can(Action.Read, Agendamento);
        }

        return build({
            detectSubjectType: (item) =>
              item.constructor as ExtractSubjectType<Subjects>,
            conditionsMatcher: lambdaMatcher,
          });
    }
}
