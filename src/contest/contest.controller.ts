import { Controller } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Get } from '@nestjs/common';
@Controller('contest')
export class ContestController {
    constructor(private readonly contestservice:ContestService) {}

    @Get()
    async getinfo(): Promise<any>{
        return await this.contestservice.getinfo();
    }
}
