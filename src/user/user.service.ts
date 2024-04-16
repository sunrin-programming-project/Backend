import { HttpException, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly entityManager: EntityManager
    ){}

    async findOne(email: string){
        const user = await this.entityManager.getRepository('user')
        return await user.findOne({
            where: {email: email}
        })
    }

    async create(user: any){
        console.log(user);
        const newUser = this.entityManager.create('user', user);

        if(!newUser){
            throw new HttpException('User not created', 500);
        }

        return await this.entityManager.save(newUser);
    }
    
    async editUserInfo(user: any){
        const newUser = await this.findOne(user.email);

        if(!newUser){
            throw new HttpException('User not found', 404);
        }

        newUser.email = user.email;
        newUser.email_recieve = user.email_recieve;
        newUser.field = user.field;

        const result = await this.entityManager.save(newUser);

        if(!result){
            throw new HttpException('User not updated', 500);
        }

        return result;
    }

}
