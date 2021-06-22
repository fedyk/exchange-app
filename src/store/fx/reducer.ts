import { ActionTypes, FxState, SET_FX } from './types'

const initialState: FxState = null

export function fxReducers(state = initialState, action: ActionTypes): FxState {
  switch (action.type) {
    case SET_FX:
      return action.payload

    default:
      return state
  }
}
