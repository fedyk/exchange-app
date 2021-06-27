import { Transaction } from '../../types'
import { ActionTypes, ADD_TRANSACTION } from './types'

export function addTransaction(transaction: Transaction): ActionTypes {
  return {
    type: ADD_TRANSACTION,
    payload: transaction
  }
}
