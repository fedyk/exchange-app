import { ActionTypes, TransactionsState, ADD_TRANSACTION } from "./types"

const initialState: TransactionsState = []

export function transactionsReducers(state = initialState, action: ActionTypes): TransactionsState {
  switch (action.type) {
    case ADD_TRANSACTION:
      return [action.payload].concat(state)

    default:
      return state
  }
}
