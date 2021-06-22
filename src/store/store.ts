import * as redux from 'redux'
import { accountsReducers } from './accounts/reducer'
import { fxReducers } from './fx/reducer'

const combinedReducer = redux.combineReducers({
  fx: fxReducers,
  accounts: accountsReducers,
})

export type RootState = ReturnType<typeof combinedReducer>

export type Store = ReturnType<typeof createStore>

export function createStore(preloadedState?: Partial<RootState>) {
  return redux.createStore(combinedReducer, preloadedState)
}
