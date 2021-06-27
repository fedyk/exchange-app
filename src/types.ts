export interface Fx {
  base: string
  rates: Record<string, number>
}

export interface Account {
  id: number
  currency: string
  currencySign: string
  balance: number
}

export interface Transaction {
  id: number
  title: string
  from: number
  fromCurrency: string
  fromCurrencySign: string
  to: number
  toCurrency: string
  toCurrencySign: string
  createdAt: number
}