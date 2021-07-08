import { isNumber } from "./is-number"

test("isNumber should validated string", () => {
  expect(isNumber("")).toBe(true) // threat empty string as 0
  expect(isNumber("1")).toBe(true)
  expect(isNumber("1.0")).toBe(true)
  expect(isNumber("1,0")).toBe(true)
  expect(isNumber("1.00")).toBe(true)
  expect(isNumber("1,00")).toBe(true)
  expect(isNumber("1.00.")).toBe(false)
  expect(isNumber("1.00,")).toBe(false)
  expect(isNumber("abb")).toBe(false)
})