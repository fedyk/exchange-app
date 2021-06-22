import { ActionTypes, AccountsState, SET_ACCOUNTS } from './types'

const initialState: AccountsState = []

export function accountsReducers(state = initialState, action: ActionTypes): AccountsState {
  switch (action.type) {
    case SET_ACCOUNTS:
      return action.payload

    default:
      return state
  }
}
