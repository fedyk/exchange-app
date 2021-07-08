import { Account } from "../../types";

export type AccountsState = Array<Account>

export const SET_ACCOUNTS = "SET_ACCOUNTS";
export const UPDATE_ACCOUNT = "UPDATE_ACCOUNT";

export interface setAccountsAction {
  type: typeof SET_ACCOUNTS
  payload: Account[]
}

export interface updateAccountAction {
  type: typeof UPDATE_ACCOUNT
  payload: {
    accountId: number,
    account: Partial<Account>
  }
}

export type ActionTypes = setAccountsAction | updateAccountAction
