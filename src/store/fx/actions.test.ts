import { setFx } from "./actions"
import { SET_FX } from "./types"

test("setAccounts should return valid redux action", () => {
  const payload: any = {}

  expect(setFx(payload)).toHaveProperty("type", SET_FX)
  expect(setFx(payload)).toHaveProperty("payload", payload)
})
