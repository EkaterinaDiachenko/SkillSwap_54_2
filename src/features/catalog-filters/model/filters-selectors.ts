import { createSelector } from '@reduxjs/toolkit'
import type { City, Skill, User } from '@/shared/types'
import { SKILL_CATEGORIES } from '@/entities/skill/model/skill-categories'
import { selectSkills } from '@/entities/skill/model/skills-selectors'
import { selectUsers } from '@/entities/user/model/users-selectors'
import type { SkillsRootState } from '@/entities/skill/model/skills-selectors'
import type { UsersRootState } from '@/entities/user/model/users-selectors'
import type { CatalogFilters } from './types'
import type { FiltersState } from './filters-slice'

export type FiltersRootState = {
  filters: FiltersState
}

export type CatalogFiltersRootState = FiltersRootState & UsersRootState & SkillsRootState

const selectFiltersState = (state: CatalogFiltersRootState): CatalogFilters => state.filters

export const selectFilters = (state: CatalogFiltersRootState): CatalogFilters =>
  selectFiltersState(state)

export const selectFilterMode = (state: CatalogFiltersRootState): CatalogFilters['mode'] =>
  selectFiltersState(state).mode

export const selectCategoryIds = (state: CatalogFiltersRootState): string[] =>
  selectFiltersState(state).categoryIds

export const selectSubcategoryIds = (state: CatalogFiltersRootState): string[] =>
  selectFiltersState(state).subcategoryIds

export const selectGender = (state: CatalogFiltersRootState): CatalogFilters['gender'] =>
  selectFiltersState(state).gender

export const selectCities = (state: CatalogFiltersRootState): CatalogFilters['cities'] =>
  selectFiltersState(state).cities

export const selectHasActiveFilters = createSelector(
  [selectFilterMode, selectCategoryIds, selectSubcategoryIds, selectGender, selectCities],
  (mode, categoryIds, subcategoryIds, gender, cities) =>
    mode !== 'all' ||
    categoryIds.length > 0 ||
    subcategoryIds.length > 0 ||
    gender !== 'any' ||
    cities.length > 0,
)

export interface CategoryFilterState {
  checked: boolean
  indeterminate: boolean
}

export const selectCategoryState = (
  state: CatalogFiltersRootState,
  categoryId: string,
): CategoryFilterState => {
  const categoryIds = selectCategoryIds(state)
  const subcategoryIds = new Set(selectSubcategoryIds(state))
  const category = SKILL_CATEGORIES.find((item) => item.id === categoryId)

  if (!category) {
    return { checked: false, indeterminate: false }
  }

  const checked = categoryIds.includes(categoryId)
  const indeterminate =
    !checked && category.subcategories.some((subcategory) => subcategoryIds.has(subcategory.id))

  return { checked, indeterminate }
}

const selectMatchingUsersByFilters = createSelector(
  [
    selectFilterMode,
    selectCategoryIds,
    selectSubcategoryIds,
    selectGender,
    selectCities,
    selectSkills,
    selectUsers,
  ],
  (mode, categoryIds, subcategoryIds, gender, cities, skills, users) => {
    const categoryIdSet = new Set(categoryIds)
    const subcategoryIdSet = new Set(subcategoryIds)
    const citySet = new Set(cities)
    const userIds = new Set(users.map((user) => user.id))

    const matchesCategoryFilters = (skill: Skill): boolean => {
      if (categoryIdSet.size === 0 && subcategoryIdSet.size === 0) {
        return true
      }

      return categoryIdSet.has(skill.categoryId) || subcategoryIdSet.has(skill.subcategoryId)
    }

    const matchesUserFilters = (user: User): boolean => {
      const genderMatches = gender === 'any' || user.gender === gender
      const cityMatches = citySet.size === 0 || citySet.has(user.city)

      return genderMatches && cityMatches
    }

    const matchedUserIds = new Set<string>()

    for (const skill of skills) {
      if (!userIds.has(skill.authorId)) {
        continue
      }

      if (mode !== 'all' && skill.type !== mode) {
        continue
      }

      if (!matchesCategoryFilters(skill)) {
        continue
      }

      const author = users.find((user) => user.id === skill.authorId)

      if (!author || !matchesUserFilters(author)) {
        continue
      }

      matchedUserIds.add(skill.authorId)
    }

    return users.filter((user) => matchedUserIds.has(user.id)).map((user) => user.id)
  },
)

export const selectFilteredUserIds = selectMatchingUsersByFilters

export const selectFilteredTeachSkills = createSelector(
  [selectFilteredUserIds, selectSkills],
  (userIds, skills) => {
    const userIdSet = new Set(userIds)

    return skills.filter((skill) => skill.type === 'teach' && userIdSet.has(skill.authorId))
  },
)

export const selectActiveFiltersCount = createSelector(
  [selectFilterMode, selectCategoryIds, selectSubcategoryIds, selectGender, selectCities],
  (mode, categoryIds, subcategoryIds, gender, cities) =>
    Number(mode !== 'all') +
    Number(gender !== 'any') +
    categoryIds.length +
    subcategoryIds.length +
    cities.length,
)

export const selectAvailableCities = createSelector(
  [selectUsers],
  (users): City[] => {
    const seen = new Set<City>()
    const result: City[] = []

    for (const user of users) {
      if (!seen.has(user.city)) {
        seen.add(user.city)
        result.push(user.city)
      }
    }

    return result
  },
)
