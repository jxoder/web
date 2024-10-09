import { AiImageApi } from './sub/ai-image.service'
import { AuthApi } from './sub/auth.service'
import { ComfyApi } from './sub/comfy.service'

export class ApiService {
  auth: AuthApi
  comfy: ComfyApi
  aiImage: AiImageApi

  constructor(
    protected endpoint: string,
    protected getAccessToken: () => string | null | undefined,
  ) {
    this.auth = new AuthApi(this)
    this.comfy = new ComfyApi(this)
    this.aiImage = new AiImageApi(this)
  }

  async get<T>(url: string, queryString: object = {}) {
    const qs = new URLSearchParams(queryString as URLSearchParams).toString()
    const response = await fetch(`${this.endpoint}${url}?${qs}`, {
      headers: this.createHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(JSON.stringify(error))
    }

    return response.json() as T
  }

  async post<T>(url: string, body: object = {}) {
    const response = await fetch(`${this.endpoint}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: this.createHeaders(),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(JSON.stringify(error))
    }

    return response.json() as T
  }

  protected createHeaders(): HeadersInit {
    const headers: HeadersInit = { 'Content-Type': 'application/json' }

    if (this.getAccessToken()) {
      headers['Authorization'] = `Bearer ${this.getAccessToken()}`
    }

    return headers
  }
}
