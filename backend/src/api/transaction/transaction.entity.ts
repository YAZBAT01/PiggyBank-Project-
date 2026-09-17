export type Transaction = {
  id: string;
  accountID: string;
  date: Date;
  amount: number;
  balance: number;
  description: string;
  transactionCategoryID: number;
};
