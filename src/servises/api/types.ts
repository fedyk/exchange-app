import { Rates } from "../../types";

export interface APIInterface {
  fetchRates(signal?: AbortSignal): Promise<Rates>
}
