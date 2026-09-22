import { model, Schema } from 'mongoose';
import { EmailConfirmation } from './emailConfirmation.entity';

const emailConfirmationSchema = new Schema<EmailConfirmation>({
    userId: String,
    confirmationToken: String,
    isConfirmed: Boolean
});

emailConfirmationSchema.set('toJSON', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

emailConfirmationSchema.set('toObject', {
  virtuals: true,
  transform: (_, ret: any) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

export const EmailConfirmationModel = model<EmailConfirmation>('emailConfirmation', emailConfirmationSchema);
