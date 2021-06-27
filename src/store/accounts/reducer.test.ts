import { accountsReducers } from "./reducer"
import { SET_ACCOUNTS } from "./types"

test("accountsReducers should define initial state", () => {
  const action: any = { type: "$INITIAL" }

  expect(accountsReducers(undefined, action)).toEqual([])
})

test("accountsReducers should set new accounts", () => {
  const action: any = {
    type: SET_ACCOUNTS,
    payload: [1]
  }

  expect(accountsReducers(undefined, action)).toEqual(action.payload)
})
