export type PaginationLinks = {
  first: string|null
  last: string|null
  prev: string|null
  next: string|null
}

export type PaginationLink = {
  url: string|null
  label: string
  active: boolean
}

export type PaginationMeta = {
  current_page: number
  from: number
  last_page: number
  links: PaginationLink[]
  path: string
  per_page: number
  to: number
  total: number
}