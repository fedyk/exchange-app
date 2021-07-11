import { Rates, RatesStatus } from "../../types"
import { ratesReducers } from "./reducer"
import { setRatesAction, SET_RATES, setRatesStatusAction, SET_RATES_STATUS } from "./types"

test("fxReducers should define initial state", () => {
  const action: any = { type: "$INITIAL" }

  expect(ratesReducers(undefined, action)).toEqual({
    rates: null,
    status: RatesStatus.Unknown
  })
})

test("fxReducers should set rates", () => {
  const rates: Rates = {
    base: "USD",
    rates: {}
  }

  const action: setRatesAction = {
    type: SET_RATES,
    payload: rates,
  }

  expect(ratesReducers(undefined, action)).toHaveProperty("rates", rates)
})

test("fxReducers should set rates status", () => {
  const action: setRatesStatusAction = {
    type: SET_RATES_STATUS,
    payload: RatesStatus.Syncing,
  }

  expect(ratesReducers(undefined, action)).toHaveProperty("status", RatesStatus.Syncing)
})
