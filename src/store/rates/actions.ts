import { Rates, RatesStatus } from "../../types"
import { ActionTypes, SET_RATES, SET_RATES_STATUS } from "./types"

export function setRates(rates: Rates): ActionTypes {
  return {
    type: SET_RATES,
    payload: rates
  }
}

export function setRatesStatus(status: RatesStatus): ActionTypes {
  return {
    type: SET_RATES_STATUS,
    payload: status
  }
}
