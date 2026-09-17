import { model, Schema } from 'mongoose';
import { MobileRecharge } from './mobile-recharge.entity';

const mobileRechargeSchema = new Schema<MobileRecharge>({
  phoneNumber: String,
  provider: String,
  amount: Number,
});

mobileRechargeSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

mobileRechargeSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const MobileRechargeModel = model<MobileRecharge>(
  'MobileRecharge',
  mobileRechargeSchema,
);
