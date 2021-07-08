import * as redux from 'redux'
import { accountsReducers } from './accounts/reducer'
import { ratesReducers } from './rates/reducer'
import { transactionsReducers } from './transactions/reducer'

const combinedReducer = redux.combineReducers({
  rates: ratesReducers,
  accounts: accountsReducers,
  transactions: transactionsReducers,
})

export type RootState = ReturnType<typeof combinedReducer>

export type Store = ReturnType<typeof createStore>

export function createStore(preloadedState?: Partial<RootState>) {
  return redux.createStore(combinedReducer, preloadedState)
}
