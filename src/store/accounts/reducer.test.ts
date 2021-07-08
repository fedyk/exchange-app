import { accountsReducers } from "./reducer"
import { AccountsState, SET_ACCOUNTS, updateAccountAction, UPDATE_ACCOUNT } from "./types"

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

test("accountsReducers should update an account", () => {
  const initialState: AccountsState = [{
    id: 1,
    currency: "USD",
    currencySign: "$",
    balance: 100,
  }]
  const action: updateAccountAction = {
    type: UPDATE_ACCOUNT,
    payload: {
      accountId: 1,
      account: {
        balance: 0
      }
    }
  }

  expect(accountsReducers(initialState, action)).toHaveProperty([0, "balance"], 0)
})
