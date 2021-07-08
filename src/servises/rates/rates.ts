import { APIInterface } from "../api/types";
import { Store, setRates, setRatesStatus } from "../../store";
import { Status } from "../../store/rates/types";

export class Rates {
  api: APIInterface
  store: Store
  timer?: number
  abort?: AbortController
  syncInterval: number

  constructor(api: APIInterface, store: Store, syncInterval = 10 * 1000) {
    this.api = api
    this.store = store
    this.syncInterval = syncInterval
  }

  dispose() {
    this.abort?.abort()
    clearTimeout(this.timer)
  }

  syncRates() {
    this.store.dispatch(setRatesStatus(Status.Syncing))

    if (this.abort) {
      this.abort.abort()
    }

    this.abort = new AbortController()

    return this.api.fetchRates(this.abort.signal)
      .then(rates => {
        this.store.dispatch(setRates(rates))
        this.store.dispatch(setRatesStatus(Status.UpToDate))
        this.scheduleSync()
      })
      .catch(err => {
        this.store.dispatch(setRatesStatus(Status.OutToDate))
      })
  }

  protected scheduleSync() {
    // some typescript magic to force DOM typings for `setTimeout`
    const callback: Function = () => this.syncRates()

    this.timer = setTimeout(callback, this.syncInterval)
  }
}
