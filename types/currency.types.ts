export interface CurrencyType {
  name: string;
  rate: number;
}

export type CurrencyReturnType = (currency: CurrencyType) => Promise<{
  sucess: boolean;
  data: CurrencyType | null;
}>;

export type RetriveCurrencyRate = (
  currency: string
) => Promise<{ data: CurrencyType | null; sucess: boolean }>;
