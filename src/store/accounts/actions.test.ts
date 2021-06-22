import { setAccounts } from "./actions"

test("setAccounts should return valid redux action", () => {
  expect(setAccounts([])).toHaveProperty("type", "SET_ACCOUNTS")
  expect(setAccounts([])).toHaveProperty("payload", [])
})
