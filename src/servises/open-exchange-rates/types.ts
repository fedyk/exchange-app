import { Rates } from "../../types";

export interface IOpenExchangeRates {
  fetchRates(signal?: AbortSignal): Promise<Rates>
}
