import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'ye0ngjae.project@gmail.com',
          pass: 'tlxhhxusphtgbzoy',
        },
      },
      defaults: {
        from: '"IT 대회 뉴스레터" <contest@ye0ngjae.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(), 
        options: {  
          strict: true,
        },
      },
    }),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {

}
