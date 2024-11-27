export type GetAccessToken = () => string | null | undefined

export class ApiBase {
  constructor(
    private readonly endpoint: string,
    private readonly getAccessToken: GetAccessToken,
  ) {}

  protected async get<T>(url: string, queryString?: object): Promise<T> {
    const qs = queryString
      ? `?${new URLSearchParams(queryString as URLSearchParams).toString()}`
      : ''
    const response = await fetch(`${this.endpoint}${url}${qs}`, {
      headers: this.getHeaders(),
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(json))
    }

    return json as T
  }

  protected async post<T>(url: string, body: object = {}): Promise<T> {
    const response = await fetch(`${this.endpoint}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.getHeaders(),
    })

    const json = await response.json()

    if (!response.ok) {
      throw new Error(JSON.stringify(json))
    }

    return json as T
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }
    if (this.getAccessToken()) {
      headers['Authorization'] = `Bearer ${this.getAccessToken()}`
    }

    return headers
  }
}
