import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}

    async getAccessToken({ user }: any){
        const accessToken = this.jwtService.sign(
            { 
                email: user.email,
                name: user.name
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '20m'
            }
        );

        return accessToken;
    }

    async setRefreshToken({ user, res }){
        const refreshToken = this.jwtService.sign(
            {
                email: user.email,
                name: user.name
            },
            {
                secret: process.env.JWT_SECRET,
                expiresIn: '7d'
            }
        );
        return refreshToken;
    }

}
