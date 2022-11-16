import { UserType } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

export interface MailInterface {
  from?: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  subject: string;
  text?: string;
  html: string;
}

export type sendEmailUtil = (
  requestId: string | number | string[],
  options: MailInterface
) => Promise<any>;
