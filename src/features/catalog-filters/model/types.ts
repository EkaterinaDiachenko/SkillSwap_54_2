import type {
  City,
  Gender,
  SkillType,
} from '@/shared/types'

/** Режим каталога: показать все навыки или только teach / learn */
export type FilterMode = 'all' | SkillType

/** Фильтр по полу: «любой» или конкретное значение Gender */
export type GenderFilter = 'any' | Gender

/** Состояние фильтров каталога — будет использоваться в Redux-slice и FiltersBar */
export interface CatalogFilters {
  mode: FilterMode
  /** Выбранные ID категорий навыков */
  categoryIds: string[]
  /** Выбранные ID подкатегорий навыков */
  subcategoryIds: string[]
  gender: GenderFilter
  /** Список городов для фильтрации карточек */
  cities: City[]
}

/** Начальное состояние фильтров — все фильтры сброшены, показываются все навыки */
export const initialCatalogFilters: CatalogFilters = {
  mode: 'all',
  categoryIds: [],
  subcategoryIds: [],
  gender: 'any',
  cities: [],
}
