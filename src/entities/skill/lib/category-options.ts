import type { SelectOption } from '@/shared/ui/select'
import { SKILL_CATEGORIES } from '../model/skill-categories'

export function getCategoryOptions(): SelectOption[] {
  return SKILL_CATEGORIES.map((category) => ({
    value: category.id,
    label: category.title,
  }))
}

export function getSubcategoryOptions(categoryIds: string[]): SelectOption[] {
  const selectedCategoryIds = new Set(categoryIds)

  return SKILL_CATEGORIES.filter((category) =>
    selectedCategoryIds.has(category.id),
  ).flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      value: subcategory.id,
      label: subcategory.title,
    })),
  )
}
