import { EntityRepository, Repository } from "typeorm";
import { Contest } from "./contest.entity";

@EntityRepository(Contest)
export class ContestRepository extends Repository<Contest> {
    async createContest(contest: Contest): Promise<Contest> {
        return await this.save(contest);
    }
}