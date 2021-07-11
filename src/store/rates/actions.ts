import { Rates } from "../../types"
import { ActionTypes, Status, SET_RATES, SET_RATES_STATUS } from "./types"

export function setRates(rates: Rates): ActionTypes {
  return {
    type: SET_RATES,
    payload: rates
  }
}

export function setRatesStatus(status: Status): ActionTypes {
  return {
    type: SET_RATES_STATUS,
    payload: status
  }
}
