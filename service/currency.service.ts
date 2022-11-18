import { RequestHandler } from "express";
import CurrencyRepository from "../repository/currency.repository";

class CurrencyService {
  public static createCurrency: RequestHandler = async (req, res, next) => {
    try {
      const data = await CurrencyRepository.createCurrency(req.body);
      if (!data.sucess) {
        throw new Error("Something went wrong");
      }

      res.status(201).json({
        data: data.data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
  public static retriveCurrency: RequestHandler = async (req, res, next) => {
    try {
      console.log(req.query);
      const data = await CurrencyRepository.getCurrencyRate(req.params.name);
      if (!data) {
        throw new Error("Something went wrong");
      }
      res.status(200).json({
        data: data.data,
      });
    } catch (e) {
      console.log(e);
      next(e);
    }
  };
}

export default CurrencyService;
