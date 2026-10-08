// Base URL of the backend API (see .env.example)
const baseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/+$/, '')

export function apiUrl(path) {
  return `${baseUrl}${path}`
}

export class ApiError extends Error {
  constructor(message, status = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(method, path, body) {
  let response
  try {
    response = await fetch(apiUrl(path), {
      method,
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError('API unreachable')
  }

  // Empty for 204, and the backend sends errors as { "error": "message" }
  const data = await response.json().catch(() => null)
  if (!response.ok) {
    throw new ApiError(data?.error ?? `${response.status} ${response.statusText}`, response.status)
  }
  return data
}

export default {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
}
