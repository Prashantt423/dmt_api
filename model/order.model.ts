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

const orderSchema = new Schema<Ordertype>(
  {
    cancelled: {
      type: Boolean,
      default: false,
    },
    customer: {
      required: true,
      type: String,
    },
    expectedDelivery: {
      type: Date,
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
    items: {
      type: [],
      required: true,
    },
    transactionId: {
      required: true,
      type: String,
    },
    updates: {
      type: [updatesSchema],
    },
  },
  { timestamps: true }
);

const orderModel = model("Order", orderSchema);

export default orderModel;
