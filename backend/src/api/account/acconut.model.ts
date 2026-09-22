import { model, Schema } from 'mongoose';
import { Account } from './account.entity';

const accountSchema = new Schema<Account>({
  openingDate: Date,
  iban: String,
  userID: String,
});

accountSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

accountSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const AccountModel = model<Account>('Account', accountSchema);
