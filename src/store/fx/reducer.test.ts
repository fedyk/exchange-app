import { fxReducers } from "./reducer"
import { SET_FX } from "./types"

test("fxReducers should define initial state", () => {
  const action: any = { type: "INITIAL" }

  expect(fxReducers(undefined, action)).toEqual(null)
})

test("fxReducers should set FX data", () => {
  const action: any = {
    type: SET_FX,
    payload: {
      a: 1
    }
  }

  expect(fxReducers(undefined, action)).toEqual(action.payload)
})
