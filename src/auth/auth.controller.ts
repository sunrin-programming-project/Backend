import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { IOAuthUser } from './interfaces/user.interface';
import { CreateUserInput } from 'src/user/dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private userService: UserService,
    ){}
    
    @UseGuards(AuthGuard('google'))
    @Get('google')
    async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response){
        res.redirect('http://localhost:3000/api');
    }

    @UseGuards(AuthGuard('google'))
    @Get('google/callback')
    async googleAuthRedirect(@Req() req: Request & IOAuthUser, @Res() res: Response){
        console.log(req.user);
        let user = await this.userService.findOne(req.user.email);

        if(!user){
            const input = {
                email: req.user.email,
                name: req.user.name,
                email_recieve: false,
                field: ''
            } as CreateUserInput;

            user = await this.userService.create(input);
        }

        //this.authService.setRefreshToken({ user, res });
        const accessToken = this.authService.getAccessToken({ user });
        const refreshToken = this.authService.setRefreshToken({ user, res });
        res.setHeader('Set-Cookie', `accessToken=${accessToken}; HttpOnly`);
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly`);
        res.redirect('http://localhost:3000/api');
    }
}
