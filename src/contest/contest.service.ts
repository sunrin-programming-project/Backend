import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ITContestCrawl } from 'src/lib/crawler'
import { Contest } from './entities/contest.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class ContestService {
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {}

    private readonly logger = new Logger(ContestService.name);

    async getinfo(): Promise<any>{
        return await ITContestCrawl();
    }

    @Cron('0 0 3 * * *')
    async insertContest(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);
        const data = await this.getinfo();

        if(!data){
            throw new HttpException('Data Request Error', 501);
        }

        const count = await contestRepository.count();

        if(data.length === 0 || data.length != count){
            await this.clearDB();

            for(let i = 0; i < data.length; i++){
                const contest = new Contest();
                contest.title = data[i].title;
                contest.host = data[i].host;
                contest.target = data[i].target;
                contest.register = data[i].register;
                contest.status = data[i].status;
                contest.dday = data[i].dday;
                contest.url = data[i].url;
                await contestRepository.save(contest);
            }
        }
    }

    async getContest(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);
        return await contestRepository.find();
    }

    async clearDB(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);
        await contestRepository.clear();
    }

}
