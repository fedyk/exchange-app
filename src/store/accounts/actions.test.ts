import { setAccounts } from "./actions"
import { SET_ACCOUNTS } from "./types"

test("setAccounts should return valid redux action", () => {
  expect(setAccounts([])).toHaveProperty("type", SET_ACCOUNTS)
  expect(setAccounts([])).toHaveProperty("payload", [])
})
