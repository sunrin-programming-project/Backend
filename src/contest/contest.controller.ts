import { Controller } from '@nestjs/common';
import { ContestService } from './contest.service';
import { Get } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Contest')
@Controller('contest')
export class ContestController {
    constructor(private readonly contestservice:ContestService) {}

    @ApiOperation({summary: 'Get Contest Info'})
    @Get()
    async getinfo(): Promise<any>{
        return await this.contestservice.getinfo();
    }
}
