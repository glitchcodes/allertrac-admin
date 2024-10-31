import type { PaginationLinks, PaginationMeta } from "~/types/Pagination";
import type { Allergen } from "~/types/Allergen";

export type MealCollection = {
  data: Meal[],
  links: PaginationLinks
  meta: PaginationMeta
}

export type Meal = {
  food_id: string
  name: string
  allergens: Allergen[]
}