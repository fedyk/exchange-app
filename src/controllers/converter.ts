import { API } from "../api/api";
import { Store, setFx } from "../store";

export class Converter {
  constructor(
    protected api: API,
    protected store: Store
  ) { }
  
  async syncRates() {
    const rates = await this.api.fetchRates()

    this.store.dispatch(setFx(rates))
  }
}
