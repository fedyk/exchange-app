import { setRates, setRatesStatus } from "./actions"
import { SET_RATES, SET_RATES_STATUS } from "./types"

test("setRates should return valid redux action", () => {
  const fx: any = "fx"

  expect(setRates(fx)).toHaveProperty("type", SET_RATES)
  expect(setRates(fx)).toHaveProperty("payload", fx)
})

test("setRatesStatus should return valid redux action", () => {
  const status: any = "status"

  expect(setRatesStatus(status)).toHaveProperty("type", SET_RATES_STATUS)
  expect(setRatesStatus(status)).toHaveProperty("payload", status)
})
