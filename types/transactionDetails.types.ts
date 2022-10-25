export interface TransactionDetails {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  bank: string;
  user: string;
  createdAt: number;
  method: string;
}

export interface TransactionDetailsRepositoryReturnType {
  data: any;
  success: boolean;
}

export type CreteTransactionDetails = (
  order: object
) => Promise<TransactionDetailsRepositoryReturnType>;
