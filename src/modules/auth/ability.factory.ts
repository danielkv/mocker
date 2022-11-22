import {
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
    PureAbility,
    buildMongoQueryMatcher,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';

import { Project } from '@modules/project/entities/project.entity';
import { Resource } from '@modules/resource/entities/resource.entity';
import { User } from '@modules/user/entities/user.entity';

import { Action } from './interfaces/authorization';

type Subjects =
    | InferSubjects<typeof Project | typeof Resource | typeof User>
    | 'all';

export type AppAbility = PureAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
    createForUser(user: User) {
        const { can, build } = new AbilityBuilder<
            PureAbility<[Action, Subjects]>
        >(PureAbility as AbilityClass<AppAbility>);

        if (user.admin) {
            can(Action.Manage, 'all'); // read-write access to everything
        } else {
            can(Action.Read, 'all'); // read-only access to everything
        }

        can(Action.Update, Project, { userId: user._id });
        can(Action.Update, Resource);

        return build({
            // Read https://casl.js.org/v5/en/guide/subject-type-detection#use-classes-as-subject-types for details
            conditionsMatcher: buildMongoQueryMatcher(),
            detectSubjectType: (item) =>
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}
