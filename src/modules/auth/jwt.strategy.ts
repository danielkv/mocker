import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthenticatedUserData, JwtTokenPayload } from './interfaces/auth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getOrThrow('JWT_SECRET'),
        });
    }

    validate(payload: JwtTokenPayload): AuthenticatedUserData {
        return {
            _id: payload.sub,
            name: payload.name,
            email: payload.email,
            admin: payload.admin || false,
        };
    }
}
