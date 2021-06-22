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
