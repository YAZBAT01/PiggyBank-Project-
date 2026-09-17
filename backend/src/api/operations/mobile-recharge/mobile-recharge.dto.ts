import { IsNumber, IsString, MaxLength, Min, MinLength } from 'class-validator';

export class MobileRechargeRequestDto {
  @IsString()
  @MinLength(6)
  @MaxLength(11)
  phoneNumber: string;

  @IsString()
  provider: string;

  @IsNumber()
  @Min(1)
  amount: number;
}

export class MobileRechargeResponseDto {
  success: boolean;
  message: string;
  transactionID: string;
  updatedBalance: number;
}
