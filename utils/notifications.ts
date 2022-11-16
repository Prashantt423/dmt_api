import nodemailer from "nodemailer";
import { MailInterface, sendEmailUtil } from "../types/miscelleous.types";

export default class MailService {
  public static sendEmailUtilLocal: sendEmailUtil = async (
    requestId,
    options
  ) => {
    let account = await nodemailer.createTestAccount();
    console.log(account);
    const transport = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    transport
      .sendMail({
        from: `"dmt/rest" ${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        console.log(`${requestId} - Mail sent successfully!!`);
        console.log(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`
        );
        if (process.env.NODE_ENV === "local") {
          console.log(
            `${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
              info
            )}`
          );
        }
        return info;
      });
  };
  public static sendEmailUtilLive: sendEmailUtil = async (
    requestId,
    options
  ) => {
    const transport = nodemailer.createTransport({
      port: Number(process.env.SMTP_PORT),
      host: process.env.SMTP_HOST,
      secure: process.env.SMTP_TLS === "yes" ? true : false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    transport
      .sendMail({
        from: `"dmt/test" ${process.env.SMTP_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        console.log(`${requestId} - Mail sent successfully!!`);
        console.log(
          `${requestId} - [MailResponse]=${info.response} [MessageID]=${info.messageId}`
        );
        if (process.env.NODE_ENV === "local") {
          console.log(
            `${requestId} - Nodemailer ethereal URL: ${nodemailer.getTestMessageUrl(
              info
            )}`
          );
        }
        return info;
      });
  };
}
