import { Account } from "../../types"
import { ActionTypes, AccountsState, SET_ACCOUNTS, UPDATE_ACCOUNT } from "./types"

const initialState: AccountsState = []

export function accountsReducers(state = initialState, action: ActionTypes): AccountsState {
  switch (action.type) {
    case SET_ACCOUNTS:
      return action.payload

    case UPDATE_ACCOUNT:
      return state.map(function (account) {
        if (account.id === action.payload.accountId) {
          return Object.assign({}, account, action.payload.account) as Account
        }

        return account
      })

    default:
      return state
  }
}
