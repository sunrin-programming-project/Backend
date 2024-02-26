import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';

@Module({
  providers: [ContestService]
})
export class ContestModule {}
