import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { IOAuthUser } from './interfaces/user.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
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

        return res.redirect(process.env.FRONT_URL);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('logout')
    async logout(@Req() req: Request & IOAuthUser, @Res() res: Response){
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.redirect(process.env.FRONT_URL);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('status')
    async checkStatus(@Req() req: Request & IOAuthUser, @Res() res: Response){
        return res.json({status: 'ok', user: req.user});
    }
}
