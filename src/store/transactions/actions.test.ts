import { addTransaction } from "./actions"
import { ADD_TRANSACTION } from "./types"

test("addTransaction should return valid redux action", () => {
  const payload: any = "test"

  expect(addTransaction(payload)).toHaveProperty("type", ADD_TRANSACTION)
  expect(addTransaction(payload)).toHaveProperty("payload", payload)
})
