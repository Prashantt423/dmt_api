import { createHmac } from "crypto";
import { RequestHandler } from "express";
import RazorpayClinet from "../utils/razorpayClient";
import TransactionDetailsRepository from "../repository/transactionDetails.repository";
import OrderRepository from "../repository/order.repository";
import { Ordertype } from "../types/order.types";

class PaymentService {
  public static generatePayment: RequestHandler = async (req, res, next) => {
    try {
      const { amount, currency, receipt, notes } = req.body;

      const razorpayServerResponse =
        await RazorpayClinet.RazorpayClient.orders.create({
          amount,
          currency,
          receipt,
          notes,
        });
      console.log(razorpayServerResponse);
      res.status(200).json({
        razorpayServerResponse,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static verifyPayment: RequestHandler = async (req, res, next) => {
    try {
      const shasum = createHmac("sha256", process.env.RAZORPAYSECRET);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");
      if (digest === req.headers["x-razorpay-signature"]) {
        const newTransactionDetaailObject = {
          orderId: req.body.payload.payment.entity.order_id,
          amount: req.body.payload.payment.entity.base_amount,
          bank: req.body.payload.payment.entity.bank,
          currency: req.body.payload.payment.entity.currency,
          method: req.body.payload.payment.entity.method,
          paymentId: req.body.payload.payment.entity.id,
          user: req.body.payload.payment.entity.email,
          // deliveryAddress: req.body.payload.payment.entity.email,
        };
        console.log({ newTransactionDetaailObject });
        const newObj =
          await TransactionDetailsRepository.createTransactionDetail(
            newTransactionDetaailObject
          );
        if (!newObj.success) {
          throw new Error("Something went wrong");
        }
        const cartOrders = JSON.parse(
          req.body.payload.payment.entity.notes.products
        );
        const order: Ordertype = {
          items: JSON.parse(req.body.payload.payment.entity.notes.products),
          paymentSuccess: true,
          orderAmount: newTransactionDetaailObject.amount,
          orderedOn: new Date(Date.now()),
          updates: [{ type: "order_placed", time: Date.now() }],
          customer: newTransactionDetaailObject.user,
          transactionId: newTransactionDetaailObject.paymentId,
        };
        const createOrders = await OrderRepository.createOrders(order);
        res.status(200).json({
          sucess: true,
        });
      } else {
        throw new Error("The payment did not verify");
        // pass it
      }
    } catch (e) {
      console.log(e);
      next();
    }
  };
}

export default PaymentService;
