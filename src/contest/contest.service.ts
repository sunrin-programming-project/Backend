import { Injectable } from '@nestjs/common';
import { ITContestCrawl } from 'src/lib/crawler'

@Injectable()
export class ContestService {
    constructor() {}

    async getinfo(): Promise<any>{
        return await ITContestCrawl();
    }

}
