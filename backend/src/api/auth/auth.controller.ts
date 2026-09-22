import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { omit, pick } from 'lodash';
import passport from 'passport';
import { UserExistsError } from '../../errors/user-exists.error';
import { TypedRequest } from '../../lib/typed-request';
import userSrv from '../user/user.service';
import { ConfirmDto, LoginDto, RegisterDto } from './auth.dto';
import authSrv from './auth.service';
import { EmailConfirmationModel } from '../emailConfirmation/email.confimation.model';

export const register = async (
  req: TypedRequest<RegisterDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userData = omit(req.body, 'password', 'confirmPassword');
    const credentials = pick(req.body, 'email', 'password');
    const newUser = await userSrv.add(userData, credentials);

    await authSrv.sendEmail(credentials.email, newUser.userID);
    res.json(newUser);
  } catch (err) {
    if (err instanceof UserExistsError) {
      res.status(400);
      res.json({
        error: err.name,
        message: err.message,
      });
    } else {
      next(err);
    }
  }
};

export const login = async (
  req: TypedRequest<LoginDto>,
  res: Response,
  next: NextFunction,
) => {
  try {
    passport.authenticate(
      'local',
      { session: false },
      (loginErr, user, info) => {
        if (loginErr) {
          next(loginErr);
          return;
        }

        if (!user) {
          res.status(401);
          res.json({
            error: 'LoginError',
            message: info.message,
          });
          return;
        }

        // generare token
        const token = jwt.sign(user, 'my_jwt_secret', { expiresIn: '7 days' });
        res.json({
          user,
          token,
        });
      },
    )(req, res, next);
  } catch (err) {
    next(err);
  }
};

export const confirm = async (
  req: TypedRequest<any, ConfirmDto, any>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const isConfirmed = await authSrv.confirmEmail(req.query);
    res.json(isConfirmed);
  } catch (err) {
    next(err);
  }
};
