export type Transaction = {
  transactionID: string;
  accountID: string;
  date: Date;
  amount: number;
  balance: number;
  description: string;
  transactionCategoryID: number;
};
