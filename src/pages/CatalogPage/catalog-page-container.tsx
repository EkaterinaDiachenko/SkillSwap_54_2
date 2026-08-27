import { useMemo, useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { selectIsAuth, selectCurrentUser } from '@/features/auth/model'
import { selectUserById } from '@/entities/user/model'
import {
  selectFilters,
  selectActiveFiltersCount,
  selectHasActiveFilters,
  selectCategoryState,
  selectAvailableCities,
  selectAllCatalogCards,
  setMode,
  toggleCategory,
  toggleSubcategory,
  setGender,
  toggleCity,
  resetFilters,
} from '@/features/catalog-filters/model'
import type { CategoryFilterState } from '@/features/catalog-filters/model'
import type { City } from '@/shared/types'
import type { FilterMode, GenderFilter } from '@/features/catalog-filters/model/types'
import { CatalogPageUI } from './catalog-page'

export function CatalogPageContainer() {
  const dispatch = useAppDispatch()

  const filters = useAppSelector(selectFilters)
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)
  const availableCities = useAppSelector(selectAvailableCities)
  const allCatalogCards = useAppSelector(selectAllCatalogCards)

  const isAuth = useAppSelector(selectIsAuth)
  const currentUser = useAppSelector(selectCurrentUser)
  const user = useAppSelector((state) =>
    currentUser ? selectUserById(state, currentUser.id) : null,
  )

  const categoryStates = useMemo(() => {
    const states: Record<string, CategoryFilterState> = {}
    for (const cat of SKILL_CATEGORIES) {
      states[cat.id] = selectCategoryState({ filters } as Parameters<typeof selectCategoryState>[0], cat.id)
    }
    return states
  }, [filters])

  const filteredCards = useMemo(() => {
    if (!hasActiveFilters) return []
    return [...allCatalogCards].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [hasActiveFilters, allCatalogCards])

  const handleSetMode = useCallback(
    (mode: string) => dispatch(setMode(mode as FilterMode)),
    [dispatch],
  )

  const handleToggleCategory = useCallback(
    (categoryId: string, subcategoryIds: string[]) =>
      dispatch(toggleCategory({ categoryId, subcategoryIds })),
    [dispatch],
  )

  const handleToggleSubcategory = useCallback(
    (categoryId: string, subcategoryId: string, subcategoryIds: string[]) =>
      dispatch(toggleSubcategory({ categoryId, subcategoryId, subcategoryIds })),
    [dispatch],
  )

  const handleSetGender = useCallback(
    (gender: string) => dispatch(setGender(gender as GenderFilter)),
    [dispatch],
  )

  const handleToggleCity = useCallback(
    (city: City) => dispatch(toggleCity(city)),
    [dispatch],
  )

  const handleResetFilters = useCallback(() => dispatch(resetFilters()), [dispatch])

  return (
    <CatalogPageUI
      isAuth={isAuth}
      userName={user?.name}
      avatarSrc={user?.avatarUrl ?? undefined}
      filters={filters}
      activeFiltersCount={activeFiltersCount}
      hasActiveFilters={hasActiveFilters}
      categories={SKILL_CATEGORIES}
      categoryStates={categoryStates}
      availableCities={availableCities}
      filteredCards={filteredCards}
      filteredCount={filteredCards.length}
      onSetMode={handleSetMode}
      onToggleCategory={handleToggleCategory}
      onToggleSubcategory={handleToggleSubcategory}
      onSetGender={handleSetGender}
      onToggleCity={handleToggleCity}
      onResetFilters={handleResetFilters}
    />
  )
}
