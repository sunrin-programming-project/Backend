import { Controller, HttpException, NotFoundException } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Contest')
@Controller('contest')
export class ContestController {
    constructor(private readonly contestservice:ContestService) {}

    @ApiOperation({summary: 'Insert Contest Info'})
    @Get('insert')
    async insertContest(): Promise<any>{
        return await this.contestservice.insertContest();
    }

    @ApiOperation({summary: 'Get Contest Info'})
    @Get('get')
    async getContest(): Promise<any>{
        const contest = await this.contestservice.getContest();
        if(contest.length === 0){
            throw new HttpException('No Contest Info', 404);
        }
        return contest;
    }

    @ApiOperation({summary: 'Clear Contest Info'})
    @Get('clear')
    async clearDB(): Promise<any>{
        return await this.contestservice.clearDB();
    }

    @ApiOperation({summary: 'Get Contest Info Crawl'})
    @Get('crawl')
    async getinfo(): Promise<any>{
        return await this.contestservice.getinfo("1");
    }

}
