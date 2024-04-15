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
        let user = await this.userService.findOne(req.user.email);

        if(!user){
            const input = {
                email: req.user.email,
                name: req.user.name,
                email_recieve: false,
                field: null
            } as CreateUserInput;

            user = await this.userService.create(req.user);
        }

        this.authService.setRefreshToken({ user, res });
        res.redirect('http://localhost:3000/api');
    }
}
