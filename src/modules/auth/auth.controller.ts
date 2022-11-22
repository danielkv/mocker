import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthPolicy } from './helpers/auth';
import { AuthenticatedRequest, LoginRequest } from './interfaces/auth';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @AuthPolicy('public')
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: LoginRequest) {
        return this.authService.login(req.user);
    }

    @AuthPolicy()
    @Get('profile')
    getProfile(@Request() req: AuthenticatedRequest) {
        return req.user;
    }
}
