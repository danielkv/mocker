import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AbilityFactory, AppAbility } from '../ability.factory';
import { CHECK_POLICIES_KEY } from '../helpers/auth';
import { PolicyHandler } from '../interfaces/authorization';

@Injectable()
export class PolicesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: AbilityFactory,
    ) {}

    canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();

        if (!req.user) return false;

        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];

        const ability = this.caslAbilityFactory.createForUser(req.user);

        req.ability = ability;

        return policyHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
        );
    }

    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
        if (typeof handler === 'function') {
            return handler(ability);
        }
        return handler.handle(ability);
    }
}
