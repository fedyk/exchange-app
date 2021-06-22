import { API } from './api'

test('API should retrieve and parse FX data', async () => {
  const httpProvider = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      base: 'EUR',
      rates: {
        USD: 1,
        GBP: 0.5
      }
    })
  }))

  // @ts-ignore
  const api = new API(httpProvider)
  const rates = await api.fetchRates()

  expect(rates).toEqual({
    base: 'EUR',
    rates: {
      USD: 1,
      GBP: 0.5
    }
  })
})
