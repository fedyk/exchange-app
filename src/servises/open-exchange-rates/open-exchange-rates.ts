import { Rates } from "../../types"
import { IOpenExchangeRates } from "./types"

const defaultHttpProvider = (...args: Parameters<typeof fetch>) => {
  return fetch(...args)
}

export class OpenExchangeRates implements IOpenExchangeRates {
  httpProvider: typeof defaultHttpProvider

  constructor(httpProvider = defaultHttpProvider) {
    this.httpProvider = httpProvider
  }

  fetchRates(signal?: AbortSignal): Promise<Rates> {
    const url = "https://openexchangerates.org/api/latest.json?app_id=487ba03c696b415ab481a430e1f731bc&symbols=EUR,GBP"

    return this.httpProvider(url, { signal: signal })
      .then((resp) => this.parseResponse(resp))
  }

  private parseResponse(response: Response) {
    if (response.ok) {
      return response.json().then(json => this.parseFx(json))
    }
    else {
      throw new Error(`Fail to retrieve FX information: ${response.statusText} (${response.status})`)
    }
  }

  private parseFx(json?: any): Rates {
    const base = String(json?.base ?? "")
    const rates: Record<string, number> = json.rates || {}

    return {
      base,
      rates
    }
  }
}