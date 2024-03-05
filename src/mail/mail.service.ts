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
                url: 'http://localhost:3000/vertify'
            },
        });
    }
    
}
