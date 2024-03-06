import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITContestCrawl } from 'src/lib/crawler'
import { ContestRepository } from './entities/contestRepository';

@Injectable()
export class ContestService {
    constructor(
        @InjectRepository(ContestRepository)
        private contestRepository: ContestRepository
    ) {}

    async getinfo(): Promise<any>{
        return await ITContestCrawl();
    }

    async createContest(contest: any): Promise<any> {
        return await this.contestRepository.createContest(contest);
    }

}
