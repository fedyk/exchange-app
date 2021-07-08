import { createStore } from "./store"

test("`createStore` should create empty store", () => {
  expect(createStore()).toHaveProperty("getState")
  expect(createStore()).toHaveProperty("dispatch")
})

test("`createStore` should create store with initial values", () => {
  const initialState: any = {
    accounts: 1,
    rates: 2
  }

  expect(createStore(initialState).getState()).toHaveProperty("accounts", initialState.accounts)
  expect(createStore(initialState).getState()).toHaveProperty("rates", initialState.rates)
})