export interface FetchSignal {
  signal: AbortSignal
}

export interface GetUsersResult {
  total_count: number,
  items: Array<User>
}

export interface User {
  avatar_url: string,
  login: string,
  html_url: string,
}

export interface Repository {
  name: string,
  description: string,
  language: string,
  watchers: number,
  forks: number,
  html_url: string
}
