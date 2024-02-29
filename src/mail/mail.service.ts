import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendTestMail() {
        await this.mailerService.sendMail({
            to: 'kimjh38012@outlook.com',
            from: 'contest@ye0ngjae.com',
            subject: 'Testing Nest Mailer',
            text: 'Testing Nest Mailer',
            html: '<b>Testing Nest Mailer</b>',
        });
    }
    
}
