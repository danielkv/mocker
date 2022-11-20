import { UserWithoutPassword } from '@modules/user/entities/user.entity';

export interface LoginRequest extends Request {
    user: UserWithoutPassword;
}

type AuthenticatedUserData = Pick<
    UserWithoutPassword,
    '_id' | 'email' | 'name'
>;

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUserData;
}

export interface JwtTokenPayload {
    sub: string; // userId
    email: string;
    name: string;
}
