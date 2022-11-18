import { Router } from "express";
import CurrencyService from "../service/currency.service";

const router = Router();
router.post("/", CurrencyService.createCurrency);
router.get("/:name", CurrencyService.retriveCurrency);
export default router;
