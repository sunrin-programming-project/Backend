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

    async getinfo(page: string): Promise<any>{
        return await ITContestCrawl(page);
    }

    // 대회 정보 DB 저장
    @Cron('0 0 3 * * *')
    async insertContest(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);

        var data = [];
        for(let i = 1 ; i <= 3 ; i++){
            let crawl_data = await this.getinfo(i.toString());    
            data.push(...crawl_data);

            if(crawl_data.length < 12){
                break;
            }
        }

        if(data.length === 0){
            throw new HttpException('No Contest Info', 404);
        }

        const dbData = await contestRepository.createQueryBuilder("contest")
        .addSelect("CONVERT(SUBSTRING(contest.dday, 3), UNSIGNED INTEGER)", "dday_number")
        .orderBy("dday_number", "ASC")
        .addOrderBy("contest.title", "ASC")
        .getMany();

        if(data.length === 0 || data != dbData){
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

    // 대회 정보 DB 조회
    async getContest(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);
        return await contestRepository.createQueryBuilder("contest")
            .addSelect("CONVERT(SUBSTRING(contest.dday, 3), UNSIGNED INTEGER)", "dday_number")
            .orderBy("dday_number", "ASC")
            .addOrderBy("contest.title", "ASC")
            .getMany();
    }

    // 대회 정보 DB 삭제
    async clearDB(): Promise<any>{
        const contestRepository = this.entityManager.getRepository(Contest);
        await contestRepository.clear();
    }

}
