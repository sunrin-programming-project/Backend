import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        private readonly entityManager: EntityManager
    ){}

    async findOne(google_id: string){
        const user = await this.entityManager.getRepository('user');
        const result = await user.findOne({
            where: {googleId: google_id}
        });

        if(!result){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async create(user: any){
        const newUser = this.entityManager.create('user', user);

        if(!newUser){
            throw new HttpException('User not created', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return await this.entityManager.save(newUser);
    }
    
    async editUserInfo(google_id: string, user: any){
        const newUser = await this.findOne(google_id);

        if(!newUser){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        newUser.email = user.email;
        newUser.email_recieve = user.email_recieve;
        newUser.field = user.field;

        const result = await this.entityManager.save(newUser);

        if(!result){
            throw new HttpException('User not updated', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    async findByRefreshToken(hashedRefreshToken: string){
        const user = await this.entityManager.getRepository('user')
        const result = await user.findOne({
            where: {refresh_token: hashedRefreshToken}
        })

        if(!result){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateRefreshToken(google_id: string, refreshToken: string){
        const user = await this.findOne(google_id);

        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        user.refresh_token = refreshToken;

        const result = await this.entityManager.save(user);

        if(!result){
            throw new HttpException('User not updated', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return result;
    }

    async getAllUser(){
        const user = await this.entityManager.getRepository('user');
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return await user.find();
    }
}
