import { Controller } from '@nestjs/common';
import { MailService } from './mail.service';
import { Get, Post } from '@nestjs/common';
import { ITContestCrawl } from 'src/lib/crawler'
import { ApiOperation, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Mail')
@Controller('mail')
export class MailController {
    constructor(private readonly mailServeice:MailService) {}

    @ApiOperation({summary: 'Send Contest Mail'})
    @ApiParam({name: 'email', required: true})
    @ApiParam({name: 'name', required: true})
    @Get('contest')
    async sendContestMail() {
        const contestData = await ITContestCrawl();
        return await this.mailServeice.sendContestMail('op@ye0ngjae.com', {name: 'test', type: 'IT Contest' ,contest: contestData});
    }
    
}
