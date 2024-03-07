import { Module } from '@nestjs/common';
import { ContestService } from './contest.service';
import { ContestController } from './contest.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contest } from './entities/contest.entity';
import { ContestRepository } from './entities/contestRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contest, ContestRepository])
  ],
  providers: [ContestService],
  controllers: [ContestController],
})
export class ContestModule {}
