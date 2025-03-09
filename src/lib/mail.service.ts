import * as nodemailer from 'nodemailer';
import { MAIL_FROM, MAIL_TRANSPORT } from 'src/utils/constants';

interface SendMailOptions {
  to: string;
  html: string;
  subject: string;
}

class MailService {
  private transport: nodemailer.Transporter;

  constructor() {
    if (!MAIL_TRANSPORT) {
      throw new Error('MAIL_TRANSPORT is not defined');
    }
    this.transport = nodemailer.createTransport(MAIL_TRANSPORT);
  }

  async sendMail({ to, html, subject }: SendMailOptions): Promise<void> {
    await this.transport.sendMail({
      from: `"No Reply" <${MAIL_FROM}>`,
      to,
      subject,
      html,
    });
  }
}

export const mailService = new MailService();
