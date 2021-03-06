import { IOpenExchangeRates } from "../open-exchange-rates/types";
import { Store, setRates, setRatesStatus } from "../../store";
import { RatesStatus } from "../../types";

export class RatesSync {
  api: IOpenExchangeRates
  store: Store
  timer?: number
  abort?: AbortController
  syncInterval: number

  constructor(api: IOpenExchangeRates, store: Store, syncInterval = 10 * 1000) {
    this.api = api
    this.store = store
    this.syncInterval = syncInterval
  }

  stopSync() {
    this.abort?.abort()
    clearTimeout(this.timer)
  }

  startSync() {
    this.store.dispatch(setRatesStatus(RatesStatus.Syncing))

    // cancel prev request
    if (this.abort) {
      this.abort.abort()
    }

    this.abort = new AbortController()

    return this.api.fetchRates(this.abort.signal)
      .then(rates => {
        this.store.dispatch(setRates(rates))
        this.store.dispatch(setRatesStatus(RatesStatus.UpToDate))
      })
      .catch(err => {
        this.store.dispatch(setRatesStatus(RatesStatus.OutToDate))
      })
      .finally(() => {
        this.scheduleSync()
      })
  }

  protected scheduleSync() {
    // typescript magic to force DOM typings for `setTimeout`
    const callback: Function = () => this.startSync()

    this.timer = setTimeout(callback, this.syncInterval)
  }
}
