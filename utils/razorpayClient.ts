import { Razorpay } from "razorpay-typescript";

class RazorpayClinet {
  public static RazorpayClient: Razorpay = new Razorpay({
    authKey: {
      key_id: "rzp_test_roHEHSgfXREN0X",
      key_secret: "5e8jmAOWZY7vjatCd80RiTLK",
    },
  });
}

export default RazorpayClinet;
