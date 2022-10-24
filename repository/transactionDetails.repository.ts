import { CreteTransactionDetails } from "../types/transactionDetails.types";
import TransactionDetails from "../model/transactionDetails.model";

class TransactionDetailsRepository {
  public static createTransactionDetail: CreteTransactionDetails = async (
    order
  ) => {
    try {
      const newTransactionDetails = await TransactionDetails.create(order);
      return {
        data: newTransactionDetails,
        success: true,
      };
    } catch (e) {
      return {
        success: false,
        data: null,
      };
    }
  };
}

export default TransactionDetailsRepository;
