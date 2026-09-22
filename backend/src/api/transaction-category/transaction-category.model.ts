import { model, Schema } from 'mongoose';
import {
  TransactionCategory,
  TransactionCategoryType,
} from './transaction-category.entity';

const transactionCategorySchema = new Schema<TransactionCategory>({
  transactionCategoryID: Number,
  name: String,
  type: TransactionCategoryType,
});

transactionCategorySchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

transactionCategorySchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const TransactionCategoryModel = model<TransactionCategory>(
  'TransactionCategory',
  transactionCategorySchema,
);
