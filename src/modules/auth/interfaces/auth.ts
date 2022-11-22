import { UserWithoutPassword } from '@modules/user/entities/user.entity';

export interface LoginRequest extends Request {
    user: UserWithoutPassword;
}

export type AuthenticatedUserData = Pick<
    UserWithoutPassword,
    '_id' | 'email' | 'name' | 'admin'
>;

export interface AuthenticatedRequest extends Request {
    user: AuthenticatedUserData;
}

export interface JwtTokenPayload {
    sub: string; // userId
    email: string;
    name: string;
    admin: boolean;
}

export type Policy = 'admin' | 'authenticated' | 'public';
