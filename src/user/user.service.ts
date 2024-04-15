import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private readonly entityManager: EntityManager
    ){}

    async findOne(email: string){
        const user = await this.entityManager.getRepository('User')
        return await user.findOne({
            where: {email: email}
        })
    }

    async create(user: any){
        const newUser = this.entityManager.create('User', user);
        return await this.entityManager.save(newUser);
    }
    
}
