import React from "react";
import { render } from "@testing-library/react";
import { TransactionsList } from "./TransactionsList";

test("TransactionsList should render", () => {
  render(<TransactionsList transactions={[]} />)
})

test("TransactionsList should render one transaction", () => {
  render(<TransactionsList transactions={[{
    id: 0,
    from: 100,
    fromPrecision: 2,
    fromCurrency: "USD",
    fromCurrencySign: "$",
    to: 200,
    toPrecision: 2,
    toCurrency: "EUR",
    toCurrencySign: "€",
    createdAt: Date.now()
  }]} />)
})
