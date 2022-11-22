import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { AUTH_POLICY } from '../helpers/auth';
import { Policy } from '../interfaces/auth';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const authPolicy = this.reflector.getAllAndOverride<Policy>(
            AUTH_POLICY,
            [context.getHandler(), context.getClass()],
        );

        if (authPolicy === 'public') return true;

        return super.canActivate(context);
    }
}
