import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/user.interface';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}
    
    @UseGuards(AuthGuard('google'))
    @Get('google')
    async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response){
        return res.redirect
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleAuthRedirect(@Req() req: Request & IOAuthUser, @Res() res: Response){
        const { accessToken, refreshToken } = await this.authService.getJWT(req.user.googleId, req.user.email, req.user.name);

        res.cookie('accessToken', accessToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        return res.redirect('http://localhost:3000/auth/test');
    }

    @UseGuards(AuthGuard('jwt-access'))
    @Get('test')
    async test(@Req() req: Request & IOAuthUser, @Res() res: Response){
        console.log(req.user.googleId);
        console.log(req.user.email);
        console.log(req.user.name);
        return res.json(req.user);
    }

    @UseGuards(AuthGuard('jwt-access'))
    @Get('logout')
    async logout(@Req() req: Request & IOAuthUser, @Res() res: Response){
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.redirect('http://localhost:3000/auth/test');
    }
}
