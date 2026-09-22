import * as bcrypt from 'bcrypt';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../../../api/user/user.entity';
import { UserIdentityModel } from './user-identity.model';

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async function (email, password, done) {
      try {
        const identity = await UserIdentityModel.findOne({
          'credentials.email': email,
        });
        // non trovo l'utente
        if (!identity) {
          return done(null, false, {
            message: `email ${email} not found`,
          });
        }

        const match = await bcrypt.compare(
          password,
          identity.credentials.hashedPassword,
        );
        if (!match) {
          return done(null, false, { message: 'invalid password' });
        }

        const user = identity.toObject().user as User;

        done(null, user);
      } catch (err) {
        done(err);
      }
    },
  ),
);
