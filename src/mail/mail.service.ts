import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}
    
    async sendUserConfirmation() {
        await this.mailerService.sendMail({
            to: '',
            from: '',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            html: '<b>welcome</b>',
        });
        return 'success';
    }
}
