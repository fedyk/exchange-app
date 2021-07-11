import { Account, Rates } from "./types";

export const defaultAccounts: Account[] = [{
  id: 1,
  currency: "USD",
  currencySign: "$",
  balance: 204554,
  precision: 2
}, {
  id: 2,
  currency: "EUR",
  currencySign: "€",
  balance: 25000,
  precision: 2
}, {
  id: 3,
  currency: "GBP",
  currencySign: "£",
  balance: 5833,
  precision: 2
}]

/**
 * The API for rates has a strict limits. In order to peovide stable demo,
 * the demo app will fall back to test data when API quota is exceeded
 */
export const fallbackRates: Rates = {
  base: "USD",
  rates: {
    EUR: 0.842857,
    GBP: 0.722836
  }
}