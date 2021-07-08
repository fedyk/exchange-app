import { Account } from "../types"
import { createTransaction } from "./create-transaction"

test("createTransaction should create a transaction object", () => {
  const fromAccount: Account = {
    id: 1,
    currency: "USD",
    currencySign: "$",
    balance: 204554,
    precision: 2
  }
  const toAccount = {
    id: 2,
    currency: "EUR",
    currencySign: "€",
    balance: 25000,
    precision: 2
  }
  expect(createTransaction(1, 2, fromAccount, toAccount)).toHaveProperty("from", 1)
  expect(createTransaction(1, 2, fromAccount, toAccount)).toHaveProperty("to", 2)
})
