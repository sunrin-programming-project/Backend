import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MailHost,
        port: Number(process.env.MailPort),
        secure: true,
        auth: {
          user: process.env.MailUser,
          pass: process.env.MailPass,
        },
      },
      defaults: {
        from: process.env.MailFrom,
      },
      template: {
        dir: process.cwd() + '/src/mail/templates/',
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
