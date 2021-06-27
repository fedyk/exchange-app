import { transactionsReducers } from "./reducer"
import { ADD_TRANSACTION } from "./types"

test("transactionsReducers should define initial state", () => {
  const action: any = { type: "TEST" }

  expect(transactionsReducers(undefined, action)).toEqual([])
})

test("transactionsReducers should add new transaction", () => {
  const action: any = {
    type: ADD_TRANSACTION,
    payload: 1
  }

  expect(transactionsReducers(undefined, action)).toEqual([1])
})
