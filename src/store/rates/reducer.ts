import { RatesStatus } from "../../types"
import { ActionTypes, RatesState, SET_RATES, SET_RATES_STATUS } from "./types"

const initialState: RatesState = {
  rates: null,
  status: RatesStatus.Unknown,
}

export function ratesReducers(state = initialState, action: ActionTypes): RatesState {
  switch (action.type) {
    case SET_RATES:
      return {
        ...state,
        rates: action.payload
      }

    case SET_RATES_STATUS:
      return {
        ...state,
        status: action.payload
      }

    default:
      return state
  }
}
