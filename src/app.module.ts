import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ContestController } from './contest/contest.controller';
import { ContestModule } from './contest/contest.module';
import { ContestService } from './contest/contest.service';

@Module({
  imports: [MailModule, ContestModule],
  controllers: [AppController, ContestController],
  providers: [AppService, ContestService],
})
export class AppModule {}
