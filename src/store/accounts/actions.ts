import { Account } from "../../types"
import { ActionTypes, SET_ACCOUNTS, UPDATE_ACCOUNT } from "./types"

export function setAccounts(accounts: Account[]): ActionTypes {
  return {
    type: SET_ACCOUNTS,
    payload: accounts
  }
}

export function updateAccount(accountId: number, account: Partial<Account>): ActionTypes {
  return {
    type: UPDATE_ACCOUNT,
    payload: {
      account,
      accountId
    }
  }
}
