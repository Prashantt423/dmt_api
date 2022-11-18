import {
  CurrencyReturnType,
  CurrencyType,
  RetriveCurrencyRate,
} from "../types/currency.types";
import currencyModel from "../model/currency.model";

class CurrencyRepository {
  public static createCurrency: CurrencyReturnType = async (
    obj: CurrencyType
  ) => {
    try {
      const data = await currencyModel.create(obj);
      return {
        sucess: true,
        data: data,
      };
    } catch (e) {
      console.log(e);
      return {
        sucess: false,
        data: null,
      };
    }
  };
  public static getCurrencyRate: RetriveCurrencyRate = async (currency) => {
    try {
      const data = await currencyModel.findOne({ name: currency }).limit(1);
      return {
        data,
        sucess: true,
      };
    } catch (er) {
      return {
        sucess: false,
        data: null,
      };
    }
  };
}

export default CurrencyRepository;
