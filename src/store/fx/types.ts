import { Fx } from "../../types";

export type FxState = Fx | null

export const SET_FX = "SET_FX";

export interface setFxAction {
  type: typeof SET_FX
  payload: Fx
}

export type ActionTypes = setFxAction
