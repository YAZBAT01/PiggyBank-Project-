import { model, Schema } from 'mongoose';
import { WireTransfer } from './wire-transfer.entity';

const wireTransferSchema = new Schema<WireTransfer>({
  destinationIBAN: String,
  amount: Number,
  description: String,
});

wireTransferSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

wireTransferSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const WireTransferModel = model<WireTransfer>(
  'WireTransfer',
  wireTransferSchema,
);
