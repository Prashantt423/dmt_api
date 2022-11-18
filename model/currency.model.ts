import { model, Schema } from "mongoose";
import { CurrencyType } from "../types/currency.types";

const currencySchema = new Schema<CurrencyType>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});
const currencyModel = model("Currency", currencySchema);
export default currencyModel;
