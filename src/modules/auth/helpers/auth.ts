import { SetMetadata } from '@nestjs/common';

import { Policy } from '../interfaces/auth';

export const AUTH_POLICY = 'AUTH_POLICY';

export const AuthPolicy = (policy?: Policy) =>
    SetMetadata(AUTH_POLICY, policy || 'authenticated');
