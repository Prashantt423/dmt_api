import { Schema, Model, model } from "mongoose";
import { TransactionDetails } from "../types/transactionDetails.types";

const transcationDetailSchema = new Schema<TransactionDetails>({
  orderId: {
    required: true,
    unique: true,
    type: String,
    trim: true,
  },
  amount: {
    required: true,
    type: Number,
  },
  bank: {
    type: String,
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
  currency: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: String,
    required: true,
  },
});

const TransactionDetails = model(
  "Transaction_Details",
  transcationDetailSchema
);

export default TransactionDetails;
