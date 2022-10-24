import { model, Model, Schema } from "mongoose";
import { Ordertype, UpdateSchema } from "../types/order.types";

const updatesSchema = new Schema<UpdateSchema>({
  time: {
    type: Number,
    default: Date.now(),
  },
  type: {
    type: String,
    required: true,
  },
});

const orderSchema = new Schema<Ordertype>({
  cancelled: {
    type: Boolean,
    default: false,
  },
  customer: {
    required: true,
    type: String,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  expectedDelivery: {
    type: Date,
    required: true,
  },
  orderAmount: {
    type: Number,
    required: true,
  },
  orderedOn: {
    type: Date,
    default: new Date(Date.now()),
  },
  paymentSuccess: {
    type: Boolean,
    default: true,
  },
  product: {
    required: true,
    type: String,
  },
  transactionId: {
    required: true,
    type: String,
  },
  updates: {
    type: [updatesSchema],
  },
});

const orderModel = model("Order", orderSchema);

export default orderModel;
