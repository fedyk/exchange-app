import { IOpenExchangeRates } from "../open-exchange-rates/types"
import { createStore, Store } from "../../store"
import { Status } from "../../store/rates/types"
import { Rates as IRates } from "../../types"
import { RatesSync } from "./rates-sync"

let ratesData: IRates
let api: IOpenExchangeRates
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
  const rates = new RatesSync(api, store)

  expect(rates).toBeInstanceOf(RatesSync)

  rates.stopSync()
})

test("Rates should sync data in store", async () => {
  const rates = new RatesSync(api, store)
  const promise = rates.startSync()

  expect(store.getState()).toHaveProperty("rates.rates", null)
  expect(store.getState()).toHaveProperty("rates.status", Status.Syncing)

  await promise

  expect(store.getState()).toHaveProperty("rates.rates", ratesData)
  expect(store.getState()).toHaveProperty("rates.status", Status.UpToDate)

  rates.stopSync()
})

