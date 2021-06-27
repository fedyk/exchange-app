import { Transaction } from "../../types";

export type TransactionsState = Transaction[]

export const ADD_TRANSACTION = "ADD_TRANSACTION";

export interface addTransactionAction {
  type: typeof ADD_TRANSACTION
  payload: Transaction
}

export type ActionTypes = addTransactionAction
