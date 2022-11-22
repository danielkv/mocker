import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from './helpers/auth';
import { AuthenticatedRequest, LoginRequest } from './interfaces/auth';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req: LoginRequest) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req: AuthenticatedRequest) {
        return req.user;
    }
}
