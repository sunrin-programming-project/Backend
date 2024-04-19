import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContestService } from 'src/contest/contest.service';
import { Cron } from '@nestjs/schedule';
import { EntityManager } from 'typeorm';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly contestService: ContestService,
        private readonly entityManager: EntityManager
    ) {}


    @Cron('0 0 7 * * *')
    async sendContestMail() {
        const contestData = await this.contestService.getContest();

        if(!contestData){
            throw new Error('Data Request Error');
        }

        const userList = await this.entityManager.getRepository('user').find({
            select: ['email', 'name'],
            where: { email_recieve: true }
        });

        for(let i = 0; i < userList.length; i++){
            const email = userList[i].email;
            const name = userList[i].name;
            const type = 'contest';

            await this.mailerService.sendMail({
                to: email,
                subject: `최신 IT 공모전 정보`,
                template: 'contest',
                context: {
                    name: name,
                    type: type,
                    contest: contestData
                },
            });
        }
    }
    
}
