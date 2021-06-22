import { Account } from "../../types";

export type AccountsState = Array<Account>

export const SET_ACCOUNTS = "SET_ACCOUNTS";

export interface setAccountsAction {
  type: typeof SET_ACCOUNTS
  payload: Account[]
}

export type ActionTypes = setAccountsAction
