import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITContestCrawl } from 'src/lib/crawler'

@Injectable()
export class ContestService {
    constructor() {}

    async getinfo(): Promise<any>{
        return await ITContestCrawl();
    }

    async createContest(contest: any): Promise<any> {
        return await this.createContest(contest);
    }

}
