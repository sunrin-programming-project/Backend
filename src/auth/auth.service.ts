import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ){}
    
    async getJWT(google_id: string, email: string, name: string){
        const user = await this.googleValidateUser(google_id, email, name);
        const accessToken = await this.generateAccessToken(google_id, user.email, user.name);
        const refreshToken = await this.generateRefreshToken(google_id, user.email, user.name);

        return { accessToken, refreshToken };
    }

    async googleValidateUser(google_id: string, email: string, name: string){
        let newUser = await this.userService.findOne(google_id);
        
        const input = {
            googleId: google_id,
            email: email,
            name: name,
            email_recieve: false,
            field: '',
            refresh_token: ''
        };

        if(!newUser){
            newUser = await this.userService.create(input); 
        }

        let User = await this.userService.findOne(google_id);

        return newUser;
    }

    async generateAccessToken(google_id: string, email: string, name: string){
        const payload = { google_id, email, name };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d'
        });
    }

    async generateRefreshToken(google_id: string, email: string, name: string){
        const payload = { google_id, email, name };
        const refreshToken = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '1d'
        });

        const saltOrRounds = Number(process.env.SALT_ROUNDS);
        const hashedRefreshToken = await hash(refreshToken, saltOrRounds);

        await this.userService.updateRefreshToken(google_id, hashedRefreshToken);

        return refreshToken;
    }

    async refresh(refreshToken: string){
        try{
            const saltOrRounds = Number(process.env.SALT_ROUNDS);
            const hashedRefreshToken = await hash(refreshToken, saltOrRounds);
            const user = await this.userService.findByRefreshToken(hashedRefreshToken);

            if(!user){
                throw new Error('User not found');
            }

            const isRefreshTokenValid = await compare(refreshToken, user.refresh_token);

            if(!isRefreshTokenValid){
                throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
            }

            const accessToken = this.generateAccessToken(user.google_id, user.email, user.name);

            return accessToken;
        }
        catch(err){
            throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }

    async logout(google_id: string){
        try{
            const user = await this.userService.findOne(google_id);
            if(!user){
                throw new Error('User not found');
            }

            await this.userService.updateRefreshToken(google_id, '');

            return true;
        }
        catch(err){
            throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
        }
    }
}
