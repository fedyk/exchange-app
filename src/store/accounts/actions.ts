import { Account } from '../../types'
import { ActionTypes, SET_ACCOUNTS } from './types'

export function setAccounts(accounts: Account[]): ActionTypes {
  return {
    type: SET_ACCOUNTS,
    payload: accounts
  }
}
