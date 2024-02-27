import { Module } from '@nestjs/common';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MailHost,
        port: Number(process.env.MailPort),
        secure: false,
        auth: {
          user: process.env.MailUser,
          pass: process.env.MailPass,
        }
      },
      defaults: {
        from: process.env.MailFrom,
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
