import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { Get, Post } from '@nestjs/common';
import { ITContestCrawl } from 'src/lib/crawler'
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
    constructor(private readonly mailServeice:MailService) {}

    @ApiOperation({summary: 'Send Vertify Mail'})
    @ApiParam({name: 'email', required: true})
    @ApiParam({name: 'name', required: true})
    @Get()
    async sendVertifyMail() {
        return await this.mailServeice.sendVertifyMail('op@ye0ngjae.com', {name: 'test'});
    }

    @ApiOperation({summary: 'Send Reset Mail'})
    @ApiParam({name: 'email', required: true})
    @ApiParam({name: 'name', required: true})
    @Get('reset')
    async sendResetMail() {
        return await this.mailServeice.sendResetMail('', {name: 'test'});
    }

    @ApiOperation({summary: 'Send Contest Mail'})
    @ApiParam({name: 'email', required: true})
    @ApiParam({name: 'name', required: true})
    @Get('contest')
    async sendContestMail() {
        const contestData = await ITContestCrawl();
        return await this.mailServeice.sendContestMail('op@ye0ngjae.com', {name: 'test', type: 'IT Contest' ,contest: contestData});
    }
    
}
