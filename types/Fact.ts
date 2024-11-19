import type { PaginationLinks, PaginationMeta } from "~/types/Pagination";

export type FactCollection = {
  data: Fact[],
  links: PaginationLinks
  meta: PaginationMeta
}

export type Fact = {
  id: number
  title: string
  description: string
  brief_description: string
  category: string
  cover_image: string
  references: string
  author: FactAuthor
}

export type FactAuthor = {
  id: number
  full_name: string
  first_name: string
  last_name: string
}

export type FactCategory = {
  id: number
  name: string
  icon: string
  icon_color: string
}