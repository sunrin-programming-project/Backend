import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendTestMail() {
        await this.mailerService.sendMail({
            to: 'kimjh38012@outlook.com',
            subject: 'Testing Nest Mailer',
            text: 'Testing Nest Mailer',
            html: '<b>Testing Nest Mailer</b>',
        });
    }

    async sendMailWithTemplate(email: string, subject:string, template: string, context: any) {
        await this.mailerService.sendMail({
            to: email,
            subject: subject,
            template: template,
            context: {
                name: context.name,
                time: new Date().toLocaleTimeString()
            },
        });
    }
    
}
