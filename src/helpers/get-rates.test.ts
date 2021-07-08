import { Rates } from '../types'
import { getRates } from './get-rates'

test('getRates should return rates for base currency', () => {
  const fx: Rates = {
    base: 'EUR',
    rates: {
      'USD': 2,
      'GBP': 4
    }
  }
  expect(getRates('EUR', 'USD', fx)).toBe(2)
  expect(getRates('USD', 'EUR', fx)).toBe(0.5)
  expect(getRates('USD', 'GBP', fx)).toBe(2)
  expect(getRates('GBP', 'USD', fx)).toBe(0.5)
})
