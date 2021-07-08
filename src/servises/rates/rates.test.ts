import { APIInterface } from "../api/types"
import { createStore, Store } from "../../store"
import { Status } from "../../store/rates/types"
import { Rates as IRates } from "../../types"
import { Rates } from "./rates"

let ratesData: IRates
let api: APIInterface
let store: Store

beforeEach(() => {
  ratesData = {
    base: "USD",
    rates: {}
  }

  api = {
    fetchRates: jest.fn(() => Promise.resolve(ratesData))
  }

  store = createStore()
})

test("Rates should initialize", () => {
  const rates = new Rates(api, store)

  expect(rates).toBeInstanceOf(Rates)

  rates.dispose()
})

test("Rates should sync data in store", async () => {
  const rates = new Rates(api, store)
  const promise = rates.syncRates()

  expect(store.getState()).toHaveProperty("rates.rates", null)
  expect(store.getState()).toHaveProperty("rates.status", Status.Syncing)

  await promise

  expect(store.getState()).toHaveProperty("rates.rates", ratesData)
  expect(store.getState()).toHaveProperty("rates.status", Status.UpToDate)

  rates.dispose()
})

