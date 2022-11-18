import crypto from "crypto";
const ALGORITHM = process.env.CRYPTO_ALGO;
const IV_LENGTH = Number(process.env.CRYPTO_IV_LENGTH);
const KEY = process.env.CRYPTO_SECRET_KEY;
const ENCODING = "hex";
class Crypto {
  public static encrypt = (data: string) => {
    const initVector = new Uint8Array(16);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, initVector);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");
    return encryptedData;
  };

  public static decrypt = (encryptedData: string) => {
    const initVector = new Uint8Array(16);
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, initVector);
    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
  };
}
export default Crypto;
