export interface Rates {
  base: string
  rates: Record<string, number>
}

export enum RatesStatus {
  Unknown,
  Syncing,
  UpToDate,
  OutToDate
}

export interface Account {
  id: number
  currency: string
  currencySign: string
  balance: number
  precision: number
}

export interface Transaction {
  id: number
  from: number
  fromPrecision: number
  fromCurrency: string
  fromCurrencySign: string
  to: number
  toPrecision: number
  toCurrency: string
  toCurrencySign: string
  createdAt: number
}
