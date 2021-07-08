import { formatMoney } from "./format-money"

test("formatMoney should format int to float woth currency sign", () => {
  expect(formatMoney(100, 2, "$")).toBe("$1")
  expect(formatMoney(1, 2, "$")).toBe("$0.01")
})
