import { Fx } from "../types"

const defaultHttpProvider = (...args: Parameters<typeof fetch>) => {
  return fetch(...args)
}

export class API {
  httpProvider: typeof defaultHttpProvider

  constructor(httpProvider = defaultHttpProvider) {
    this.httpProvider = httpProvider
  }

  fetchRates(): Promise<Fx> {
    return this.httpProvider("https://openexchangerates.org/api/latest.json?app_id=487ba03c696b415ab481a430e1f731bc&symbols=EUR,GBP")
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

  private parseFx(json?: any): Fx {
    const base = String(json?.base ?? "")
    const rates: Record<string, number> = json.rates || {}

    return {
      base,
      rates
    }
  }
}