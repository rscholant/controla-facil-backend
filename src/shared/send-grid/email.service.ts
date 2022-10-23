import { Injectable } from '@nestjs/common';
import { SendEmailDto } from '@shared/send-grid/dto/send-email.dto';
import * as sgMail from '@sendgrid/mail';
import * as path from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class EmailService {
  async send(sendData: SendEmailDto): Promise<boolean> {
    try {
      sgMail.setApiKey(process.env.SG_KEY);
      let htmlTemplate;
      if (sendData.template) {
        htmlTemplate = readFileSync(
          path.join(
            __dirname,
            '..',
            '..',
            'templates',
            `${sendData.template}.html`,
          ),
          'utf-8',
        );
      }
      const msg: sgMail.MailDataRequired = {
        to: sendData.to,
        from: 'Controla Fácil<rafael.scholant@gmail.com>',
        subject: sendData.subject,
        text: sendData.text,
        replyTo: sendData.replyTo,
        cc: sendData.cc,
        bcc: sendData.bcc,
        html: htmlTemplate || sendData.html,
        substitutions: sendData.data,
      };
      await sgMail.sendMultiple(msg);
      console.log('aqui?');
      return true;
    } catch (err) {
      console.error(err.response.body);
      return false;
    }
  }
}
