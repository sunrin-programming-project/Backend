import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendUserConfirmation() {
        await this.mailerService.sendMail({
            to: 'op@ye0ngjae.com',
            from: 'contest@ye0ngjae.com',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            html: '<b>welcome</b>',
        });
        return 'success';
    }
    
}
