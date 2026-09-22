import * as bcrypt from 'bcrypt';
import { UserExistsError } from '../../errors/user-exists.error';
import { UserIdentityModel } from '../../lib/auth/local/user-identity.model';
import { User } from './user.entity';
import { UserModel } from './user.model';

export class UserService {
  async add(
    user: Omit<User, 'userID' | 'fullName'>,
    credentials: { email: string; password: string },
  ): Promise<User> {
    const existingIdentity = await UserIdentityModel.findOne({
      'credentials.email': credentials.email,
    });
    if (existingIdentity) {
      throw new UserExistsError();
    }

    const newUser = await UserModel.create(user);

    const hashedPassword = await bcrypt.hash(credentials.password, 10);

    await UserIdentityModel.create({
      provider: 'local',
      user: newUser,
      credentials: {
        email: credentials.email,
        hashedPassword,
      },
    });

    this._setupEmailVerification(newUser.id)

    return newUser;
  }

  private async _setupEmailVerification(userID: string){

  }

}



export default new UserService();
