import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    getAccessToken({ user }: any){
        return this.jwtService.sign(
            { 
                email: user.email,
                name: user.name
            },
            {
                secret: process.env.JWT_ACCESS_SECRET,
                expiresIn: '20m'
            }
        );
    }

    setRefreshToken({ user, res }){
        const refreshToken = this.jwtService.sign(
            {
                email: user.email,
                name: user.name
            },
            {
                secret: process.env.JWT_REFRESH_SECRET,
                expiresIn: '7d'
            }
        );
        res.setHeader('Set-Cookie', `refreshToken=${refreshToken}`);
        return;
    }

}
