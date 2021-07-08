import { parseNumber } from "./parse-number"

test.each([
  ["", 0],
  ["1", 1],
  ["1.2", 1.2],
  ["1,3", 1.3],
  ["1,3", 1.3],
  ["abc", NaN],
])("parseNumber should parse %s as %f", (input, expected) => {
  expect(parseNumber(input)).toBe(expected)
})
