import { IsDate, IsMongoId, IsNumber, IsString, Min } from 'class-validator';

export class BaseGetTransactionsDto {
  @IsNumber()
  @Min(1)
  limit: number;
}

export class GetTransactionsByCategoryDto extends BaseGetTransactionsDto {
  @IsNumber()
  @Min(1)
  categoryID: number;
}

export class GetTransactionsByDateDto extends BaseGetTransactionsDto {
  @IsDate()
  startDate: Date;

  @IsDate()
  endDate: Date;
}

export class GetTransacionDetailDto {
  @IsString()
  @IsMongoId()
  id: string;
}
