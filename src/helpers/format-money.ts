export function formatMoney(amount: number, precision: number, symbol: string) {
  const factor = Math.pow(10, precision)

  return `${symbol}${amount / factor}`
}
