import { Inject, Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import got from 'got';
import { CONFIG_OPTIONS } from '../common/common.constants';
import { EmailVar, MailModuleOptions } from './mail.interface';
import { Buffer } from 'buffer';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}
  private async sendEmail(
    subject: string,
    template: string,
    emailVar: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Mediocre developer ${this.options.from}`);
    form.append('to', 'hepaj11658@gameqo.com');
    form.append('subject', subject);
    form.append('template', template);

    emailVar.forEach((evar) => form.append(`v:${evar.key}`, evar.value));
    console.log(form);

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apiKey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (e) {
      console.log('Email Sending Failed', e);
    }
  }
  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'verify-email', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
