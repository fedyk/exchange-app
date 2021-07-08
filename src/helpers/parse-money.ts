export function parseMoney(value: string, precision: number) {
  const amount = Number(value.replace(",", "."))

  if (Number.isNaN(amount)) {
    return amount
  }

  const factor = Math.pow(10, precision)

  return Math.floor(amount * factor)
}
