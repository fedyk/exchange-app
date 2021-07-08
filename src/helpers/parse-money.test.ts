import { parseMoney } from "./parse-money"

test("parseNumber should parse string as number", () => {
  expect(parseMoney("", 2)).toBe(0)
  expect(parseMoney("1", 2)).toBe(100)
  expect(parseMoney("1.2", 2)).toBe(120)
  expect(parseMoney("1,3", 2)).toBe(130)
  expect(parseMoney("1,3", 2)).toBe(130)
  expect(parseMoney("1,321", 2)).toBe(132)
  expect(parseMoney("abc", 2)).toBe(NaN)
})
