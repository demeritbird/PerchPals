import nodemailer, { TransportOptions } from 'nodemailer';
import pug from 'pug';
import { htmlToText } from 'html-to-text';

import { UserDocument } from '../types';

/**
 * Renders email's message using Pug template,
 * then sends email to selected user using SendGrid/Mailtrap depending on NODE_ENV.
 *
 * @example
 * await new EmailService(Document, `${req.protocol}://${req.get('host')}/api/v1/(...)`).sendSomeEmailFn();
 */
class EmailService {
  private to: string;
  private name: string;
  private url: string;
  private from: string;

  /**
   * @param user - Selected UserDocument
   * @param url  - FIXME: optional --> set default param
   *               link to be rendered in email for user to click
   */
  constructor(user: UserDocument, url: string) {
    this.from = `${process.env.USER_FROM} <${process.env.EMAIL_FROM}>`;
    this.to = user.email;
    this.name = user.name;
    this.url = url;
  }

  newTransport(): nodemailer.Transporter<unknown> {
    // Uses SendGrid to send prod email
    // - Link: https://app.sendgrid.com/
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

    // Uses MailTrap to dev inbox
    // - Link: https://mailtrap.io/inboxes/1892064/messages
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    } as TransportOptions);
  }

  /**
   * @param template - a filename (in string) from views/email folder
   * @param subject  - email subject shown when mail is sent
   */
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

  //// Email Templates ////
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

  async sendClassInvitationEmail() {
    await this.sendEmail('classInvitationEmail', 'You have been added to a class!');
  }
}

export default EmailService;
