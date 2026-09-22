export interface BankTransferRequest {
  destinationIban: string;
  amount: number;
  description: string;
}

export interface OperationResponse {
  success: boolean;
  message: string;
  transactionID?: string;
  updatedBalance?: number;
}
