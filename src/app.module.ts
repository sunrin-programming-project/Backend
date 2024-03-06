import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';
import { ContestController } from './contest/contest.controller';
import { ContestModule } from './contest/contest.module';
import { ContestService } from './contest/contest.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './util/typeorm.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MailModule, 
    ContestModule,
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule
  ],
  controllers: [AppController, ContestController],
  providers: [AppService, ContestService],
})
export class AppModule {}
