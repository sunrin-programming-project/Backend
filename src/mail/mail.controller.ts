import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { Get, Post } from '@nestjs/common';

@Controller('mail')
export class MailController {
    constructor(private readonly mailServeice:MailService) {}

    @Get()
    async sendVertifyMail() {
        return await this.mailServeice.sendVertifyMail('op@ye0ngjae.com', {name: 'test'});
    }

}
