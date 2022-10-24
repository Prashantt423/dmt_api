import { Router } from "express";
import PaymentService from "../service/payment.service";

const router = Router();

router.post("/make-payment", PaymentService.generatePayment);
router.post("/payment-verification", PaymentService.verifyPayment);
export default router;
