import { Rates } from "../../types";

export enum Status {
  Unknown,
  Syncing,
  UpToDate,
  OutToDate
}

export type RatesState = {
  rates: Rates | null
  status: Status 
}

export const SET_RATES = "SET_RATES";
export const SET_RATES_STATUS = "SET_RATES_STATUS";

export interface setRatesAction {
  type: typeof SET_RATES
  payload: Rates
}

export interface setRatesStatusAction {
  type: typeof SET_RATES_STATUS
  payload: Status
}

export type ActionTypes = setRatesAction | setRatesStatusAction
