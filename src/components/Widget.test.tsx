import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Widget, ConnectedWidget } from "./Widget";
import { createStore, Store } from "../store";
import { Account, Rates, RatesStatus } from "../types";

let store: Store
let rates: Rates
let accounts: Account[]
let onAddTransaction: ReturnType<typeof jest.fn>
let onUpdateAccount: ReturnType<typeof jest.fn>

const renderWidget = () => {
  const widget = render(<Widget
    rates={rates}
    accounts={accounts}
    transactions={[]}
    status={RatesStatus.UpToDate}
    onAddTransaction={onAddTransaction}
    onUpdateAccount={onUpdateAccount}
  />)
  const fromInput = widget.getByLabelText("from-input")
  const toInput = widget.getByLabelText("to-input")
  const exchangeButton = widget.getByLabelText("exchange-button")

  return {
    widget,
    fromInput,
    toInput,
    exchangeButton
  }
}

test("Widget should render", () => {
  renderWidget()
})

test("ConnectedWidget should render", () => {
  render(<Provider store={store}><ConnectedWidget /></Provider>)
})

test("Widget should disable exchange button if not enough money on balance", () => {
  const { fromInput, exchangeButton } = renderWidget()

  fireEvent.change(fromInput, { target: { value: "2" } })

  // @ts-ignore
  expect(exchangeButton.disabled).toBeTruthy()
})

test("Widget should allow exchange button", () => {
  const { fromInput, exchangeButton } = renderWidget()

  fireEvent.change(fromInput, { target: { value: "1" } })

  // @ts-ignore
  expect(exchangeButton.disabled).toBeFalsy()
})

test("Widget should add exchange transaction", () => {
  const { fromInput, exchangeButton } = renderWidget()

  fireEvent.change(fromInput, { target: { value: "1" } })
  fireEvent.click(exchangeButton)

  expect(onAddTransaction).toBeCalled()
})

test("Widget should update balances", () => {
  const { fromInput, exchangeButton } = renderWidget()

  fireEvent.change(fromInput, { target: { value: "1" } })
  fireEvent.click(exchangeButton)

  expect(onUpdateAccount).toBeCalledTimes(2)
})

beforeEach(() => {
  rates = {
    base: "USD",
    rates: {
      EUR: 0.5,
      GBP: 0.25
    }
  }

  accounts = [{
    id: 1,
    currency: "USD",
    currencySign: "$",
    balance: 100,
    precision: 2
  }, {
    id: 2,
    currency: "EUR",
    currencySign: "€",
    balance: 0,
    precision: 2
  }]

  store = createStore({
    accounts,
    rates: {
      rates,
      status: RatesStatus.UpToDate
    }
  })

  onAddTransaction = jest.fn()
  onUpdateAccount = jest.fn()
})