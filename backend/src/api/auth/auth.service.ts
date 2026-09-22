import nodemailer from 'nodemailer';
import { UserCredentials } from './auth.entity';
import * as jwt from 'jsonwebtoken';
import { ConfirmDto } from './auth.dto';
import { EmailConfirmationModel } from '../emailConfirmation/email.confimation.model';
import { NotFoundError } from '../../errors/not-found.error';

export class AuthSrv {
  async sendEmail(email: string, userID: string) {
    // generare token
    const token = jwt.sign({ userID }, 'my_jwt_secret', {
      expiresIn: '7 days',
    });
    const link = `localhost:3000/api/auth/confirmEmail?token=${token}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'mantofra.8@gmail.com', // your Gmail address
        pass: 'httmkwdsalmdnhgh', // the 16-character App Password (spaces are fine) location: mail-password.txt
      },
    });

    const info = await transporter.sendMail({
      from: '"PiggyBank" <mantofra.8@gmail.com>',
      to: email,
      subject: 'Confirm your email',
      text: `Hello! Please confirm your email address by visiting this link: ${link}`,
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px; background-color: #f9fafb;">
      <div style="background-color: #ffffff; border-radius: 12px; padding: 40px 32px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <h1 style="color: #16a34a; font-size: 22px; margin: 0 0 4px;">🐷 PiggyBank</h1>
        <p style="color: #111827; font-size: 20px; font-weight: 600; margin: 24px 0 8px;">Confirm your email</p>
        <p style="color: #4b5563; font-size: 15px; line-height: 1.6; margin: 0 0 28px;">
          Thanks for signing up! Click the button below to confirm your email address and activate your account.
        </p>
        <a href="${link}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; font-weight: 600; font-size: 15px; padding: 12px 28px; border-radius: 8px;">
          Confirm Email
        </a>
        <p style="color: #9ca3af; font-size: 13px; line-height: 1.6; margin: 28px 0 0;">
          If the button doesn't work, copy and paste this link into your browser:<br>
          <a href="${link}" style="color: #16a34a; word-break: break-all;">${link}</a>
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0 16px;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          If you didn't request this, you can safely ignore this email.
        </p>
      </div>
    </div>
  `,
    });

    await EmailConfirmationModel.create({
      userId: userID,
      confirmationToken: token,
      isConfirmed: false,
    });

  }

  async confirmEmail(confirmDetails: ConfirmDto) {
    const toUpdate = await EmailConfirmationModel.findOne({
      confirmationToken: confirmDetails.token,
    });
    if (!toUpdate) {
      throw new NotFoundError();
    }
    toUpdate.isConfirmed = true;

    const updated = await toUpdate.save();
    return updated;
  }
}

export default new AuthSrv();
