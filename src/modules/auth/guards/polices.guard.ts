import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AppAbility, CaslAbilityFactory } from '../ability.factory';
import { CHECK_POLICIES_KEY } from '../helpers/auth';
import { PolicyHandler } from '../interfaces/authorization';

@Injectable()
export class PolicesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private caslAbilityFactory: CaslAbilityFactory,
    ) {}

    canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest();

        if (!user) return false;

        const policyHandlers =
            this.reflector.get<PolicyHandler[]>(
                CHECK_POLICIES_KEY,
                context.getHandler(),
            ) || [];

        const ability = this.caslAbilityFactory.createForUser(user);

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
