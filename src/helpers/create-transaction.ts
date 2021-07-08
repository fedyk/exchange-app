import { Account, Transaction } from "../types"

let counter = 0

export function createTransaction(from: number, to: number, fromAccount: Account, toAccount: Account): Transaction {
  return {
    id: ++counter,
    from: from,
    fromPrecision: fromAccount.precision,
    fromCurrency: fromAccount.currency,
    fromCurrencySign: fromAccount.currencySign,
    to: to,
    toPrecision: toAccount.precision,
    toCurrency: toAccount.currency,
    toCurrencySign: toAccount.currencySign,
    createdAt: Date.now(),
  }
}