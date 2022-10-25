export interface UpdateSchema {
  time: number;
  type: string;
}

export interface Ordertype {
  product: string;
  deliveryAddress: string;
  orderAmount: number;
  paymentSuccess: boolean;
  orderedOn: Date;
  updates: [UpdateSchema];
  expectedDelivery: Date;
  customer: string;
  transactionId: string;
  cancelled: boolean;
}

export interface OrderReturnType {
  data: any;
  success: boolean;
}
export type OrderCreate = (order: [object]) => Promise<OrderReturnType>;
