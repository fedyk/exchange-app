import { parseNumber } from "./parse-number"

test("parseNumber should parse string as number", () => {
  expect(parseNumber("")).toBe(0)
  expect(parseNumber("1")).toBe(1)
  expect(parseNumber("1.2")).toBe(1.2)
  expect(parseNumber("1,3")).toBe(1.3)
  expect(parseNumber("1,3")).toBe(1.3)
  expect(parseNumber("abc")).toBe(NaN)
})
