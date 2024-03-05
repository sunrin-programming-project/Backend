import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { Get, Post } from '@nestjs/common';
import { ITContestCrawl } from 'src/lib/crawler'

@Controller('mail')
export class MailController {
    constructor(private readonly mailServeice:MailService) {}

    @Get()
    async sendVertifyMail() {
        return await this.mailServeice.sendVertifyMail('op@ye0ngjae.com', {name: 'test'});
    }

    @Get('reset')
    async sendResetMail() {
        return await this.mailServeice.sendResetMail('', {name: 'test'});
    }

    @Get('contest')
    async sendContestMail() {
        const contestData = await ITContestCrawl();
        return await this.mailServeice.sendContestMail('op@ye0ngjae.com', {name: 'test', type: 'IT Contest' ,contest: contestData});
    }
    
}
