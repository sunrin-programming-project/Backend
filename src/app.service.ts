import { Injectable } from '@nestjs/common';
import { ContestService } from './contest/contest.service';

@Injectable()
export class AppService {

  constructor(readonly contestService: ContestService) {}

  async getHello() {
    return this.contestService.getContest();
  }
}
