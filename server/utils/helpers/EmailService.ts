import nodemailer, { TransportOptions } from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

import { UserDocument } from '../types';

class EmailService {
  private to: string;
  private name: string;
  private url: string;
  private from: string;

  constructor(user: UserDocument, url: string) {
    this.from = `${process.env.USER_FROM} <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.name = user.name;
    this.url = url;
  }

  newTransport(): nodemailer.Transporter<unknown> {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
        tls: { rejectUnauthorized: false },
      } as TransportOptions);
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  async sendEmail(template: string, subject: string, token?: string): Promise<void> {
    const html = pug.renderFile(`${__dirname}` + `/../../views/email/${template}.pug`, {
      name: this.name,
      url: this.url,
      subject,
      token, // possibly undefined
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  /**
   * @param token 6 char length token to be written into email.
   */
  async sendWelcomeEmail(token: string): Promise<void> {
    await this.sendEmail('welcomeEmail', 'You have signed up!', token);
  }

  // TODO: change password
  async sendPasswordResetEmail() {
    await this.sendEmail(
      'passwordReset',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}

export default EmailService;
