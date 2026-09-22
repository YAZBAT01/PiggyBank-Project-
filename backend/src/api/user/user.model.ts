import { model, Schema } from 'mongoose';
import { User } from './user.entity';

const userSchema = new Schema<User>(
  {
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
  },
  { id: false },
);

userSchema.virtual('userID').get(function () {
  return this._id.toString();
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

userSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = model<User>('User', userSchema);
