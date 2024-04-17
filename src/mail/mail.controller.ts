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
    @Get('contest')
    async sendContestMail() {
        return await this.mailServeice.sendContestMail();
    }
    
}
