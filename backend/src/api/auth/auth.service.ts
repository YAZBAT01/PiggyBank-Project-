import nodemailer from 'nodemailer';
import { UserCredentials } from './auth.entity';

export class AuthSrv {
  async sendEmail(credentials: UserCredentials) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mantofra.8@gmail.com', // your Gmail address
        pass: 'httmkwdsalmdnhgh', // the 16-character App Password (spaces are fine)
      },
    });

    const info = await transporter.sendMail({
      from: '"Your Name" <mantofra.8@gmail.com',
      to: credentials.email,
      subject: 'Test email from Node.js',
      text: 'Hello! This was sent from my PC using Nodemailer and Gmail.',
      html: '<b>Hello!</b> This was sent using Nodemailer.', // optional, for HTML instead of plain text
    });

    console.log('Email sent:', info.messageId);
  }
}
export default new AuthSrv();
