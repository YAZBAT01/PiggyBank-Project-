import {
  IsNumber,
  IsString,
  Matches,
  Min,
  MinLength
} from 'class-validator';

export class WireTransferRequestDto {
  @IsString()
  @Matches(new RegExp('^[A-Z]{2}\d{2}[A-Z0-9]{11,30}$'), {
    message: 'IBAN is wrong.',
  })
  destinationIBAN: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsString()
  @MinLength(1)
  description: string;
}

export class WireTransferReaponseDto {
  success: boolean;
  message: string;
  transactionID: string;
  updatedBalance: number;
}
