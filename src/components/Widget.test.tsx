import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Widget, ConnectedWidget } from "./Widget";
import { createStore, Store } from "../store";
import { Account, Rates, Transaction } from "../types";
import { Status } from "../store/rates/types";

let store: Store
let rates: Rates
let accounts: Account[]
let transactions: Transaction[]
let onAddTransaction: ReturnType<typeof jest.fn>
let onUpdateAccount: ReturnType<typeof jest.fn>

test("Widget should render", () => {
  render(<Widget
    rates={rates}
    accounts={accounts}
    transactions={transactions}
    status={Status.UpToDate}
    onAddTransaction={onAddTransaction}
    onUpdateAccount={onUpdateAccount}
  />)
})

test("ConnectedWidget should render", () => {
  render(<Provider store={store}><ConnectedWidget /></Provider>)
})

beforeEach(() => {
  rates = {
    base: "USD",
    rates: {
      EUR: 0.842857,
      GBP: 0.722836
    }
  }

  accounts = [{
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
  }]

  transactions = [{
    id: 1,
    from: 100,
    fromCurrency: "USD",
    fromCurrencySign: "$",
    fromPrecision: 2,
    to: 2,
    toCurrency: "EUR",
    toCurrencySign: "€",
    toPrecision: 2,
    createdAt: Date.now()
  }]

  store = createStore({
    accounts,
    rates: {
      rates,
      status: Status.UpToDate
    }
  })

  onAddTransaction = jest.fn()
  onUpdateAccount = jest.fn()
})