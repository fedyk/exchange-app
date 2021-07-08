import { Account } from "./types";

export const defaultAccounts: Account[] = [
  {
    id: 1,
    currency: "USD",
    currencySign: "$",
    balance: 204554,
    precision: 2
  },
  {
    id: 2,
    currency: "EUR",
    currencySign: "€",
    balance: 25000,
    precision: 2
  },
  {
    id: 3,
    currency: "GBP",
    currencySign: "£",
    balance: 5833,
    precision: 2
  }
]
