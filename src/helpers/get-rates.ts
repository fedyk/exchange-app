import { Fx } from "../types";

export function getRates(from: string, to: string, fx: Fx) {
  const rates = Object.assign({}, fx.rates)

  rates[fx.base] = 1

  if (!rates[from] || !rates[to]) {
    throw new Error("Missed FX rates")
  }

  if (from === fx.base) {
    return rates[to]
  }

  if (to === fx.base) {
    return 1 / rates[from];
  }

  return rates[to] * (1 / rates[from])
}
