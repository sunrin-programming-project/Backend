import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ContestService } from 'src/contest/contest.service';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly contestService: ContestService
    ) {}

    async sendContestMail(email: string, context: any) {
        const contestData = await this.contestService.getContest();

        await this.mailerService.sendMail({
            to: email,
            subject: `최신 ${context.type}공모전 정보`,
            template: 'contest',
            context: {
                name: context.name,
                type: context.type,
                contest: contestData
            },
        });
    }
    
}
