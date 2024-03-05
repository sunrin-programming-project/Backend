import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVertifyMail(email: string, context: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: '이메일 인증 요청',
            template: 'vertify',
            context: {
                name: context.name,
                time: new Date().toLocaleTimeString(),
                url: context.url
            },
        });
    }

    async sendResetMail(email: string, context: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: '비밀번호 재설정 요청',
            template: 'reset',
            context: {
                name: context.name,
                time: new Date().toLocaleTimeString(),
                url: context.url
            },
        });
    }

    async sendContestMail(email: string, context: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: '최신 공모전 정보',
            template: 'contest',
            context: {
                name: context.name,
                type: context.type,
                contest: context.contest
            },
        });
    }
    
}
