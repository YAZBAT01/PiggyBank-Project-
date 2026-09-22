import { format } from 'date-fns';
import { model, Schema } from 'mongoose';
import { Transaction } from './transaction.entity';

const transactionSchema = new Schema<Transaction>({
  accountID: String,
  date: Date,
  amount: Number,
  balance: Number,
  description: String,
  transactionCategoryID: Number,
});

transactionSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    if (ret.date instanceof Date) {
      ret.date = format(ret.date, 'yyyy-MM-dd HH:mm:ss');
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

transactionSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    if (ret.date instanceof Date) {
      ret.date = format(ret.date, 'yyyy-MM-dd HH:mm:ss');
    }
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const UserModel = model<Transaction>('Transaction', transactionSchema);
