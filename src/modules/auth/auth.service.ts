import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { omit } from 'radash';

import { UserWithoutPassword } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';

import { JwtTokenPayload } from './interfaces/auth';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(
        email: string,
        pass: string,
    ): Promise<UserWithoutPassword> {
        const user = await this.usersService.findByEmail(email);
        if (!user) return null;

        const matches = await bcrypt.compare(pass, user.password);

        if (!matches) return null;

        return omit(user, ['password']);
    }

    async login(user: UserWithoutPassword) {
        const payload: JwtTokenPayload = {
            email: user.email,
            sub: user._id,
            name: user.name,
        };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
