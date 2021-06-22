import { Fx } from '../../types'
import { ActionTypes, SET_FX } from './types'

export function setFx(rates: Fx): ActionTypes {
  return {
    type: SET_FX,
    payload: rates
  }
}
