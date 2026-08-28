import { generatePath, useNavigate } from 'react-router-dom'
import { useMemo } from 'react'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { selectSkillsLoading, selectSkillsError } from '@/entities/skill/model'
import { selectUsersError, selectUsersLoading } from '@/entities/user/model'
import {
  selectAllCatalogCards,
  selectNewCards,
  selectPopularCards,
  selectRecommendedCards,
  useRecommendationsPagination,
} from '@/features/catalog/model'
import { ROUTES } from '@/shared/lib/constants'
import {
  selectFilters,
  selectHasActiveFilters,
  selectFilteredTeachSkills,
  selectActiveFiltersCount,
  selectAvailableCities,
  setMode,
  toggleCategory,
  toggleSubcategory,
  setGender,
  toggleCity,
  resetFilters,
} from '@/features/catalog-filters/model'
import type {
  FilterMode,
  GenderFilter,
  CatalogFilters,
} from '@/features/catalog-filters/model/types'
import type { ActiveFilter } from '@/shared/ui/active-filters'
import type { City } from '@/shared/types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { CatalogPageUI, type CatalogPageProps } from './catalog-page'

const MODE_LABELS: Record<CatalogFilters['mode'], string> = {
  all: '',
  teach: 'Могу научить',
  learn: 'Хочу научиться',
}

const GENDER_LABELS: Record<CatalogFilters['gender'], string> = {
  any: '',
  male: 'Мужской',
  female: 'Женский',
}

type CatalogPageContainerProps = Pick<
  CatalogPageProps,
  | 'isAuth'
  | 'userName'
  | 'avatarSrc'
  | 'onLogin'
  | 'onRegister'
  | 'onProfileClick'
  | 'onFavoritesClick'
>

export default function CatalogPage({
  isAuth,
  userName,
  avatarSrc,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
}: CatalogPageContainerProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const filters = useAppSelector(selectFilters)
  const hasActiveFilters = useAppSelector(selectHasActiveFilters)
  const activeFiltersCount = useAppSelector(selectActiveFiltersCount)
  const cities = useAppSelector(selectAvailableCities)

  const allCards = useAppSelector(selectAllCatalogCards)
  const popularCards = useAppSelector(selectPopularCards)
  const newCards = useAppSelector(selectNewCards)
  const recommendationCards = useAppSelector(selectRecommendedCards)
  const filteredTeachSkills = useAppSelector(selectFilteredTeachSkills)
  const { visibleCards, isLoadingMore, hasMore, loadMoreRef } =
    useRecommendationsPagination(recommendationCards)
  const usersLoading = useAppSelector(selectUsersLoading)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const usersError = useAppSelector(selectUsersError)
  const skillsError = useAppSelector(selectSkillsError)

  const handleReset = () => dispatch(resetFilters())
  const handleCardDetailsClick = (skillId: string) => {
    navigate(generatePath(ROUTES.SKILL, { id: skillId }))
  }
  const categoryStates = useMemo(() => {
    const states: Record<string, { checked: boolean; indeterminate: boolean }> = {}
    const subcategoryIdsSet = new Set(filters.subcategoryIds)
    for (const category of SKILL_CATEGORIES) {
      const checked = filters.categoryIds.includes(category.id)
      const indeterminate =
        !checked && category.subcategories.some((s) => subcategoryIdsSet.has(s.id))
      states[category.id] = { checked, indeterminate }
    }
    return states
  }, [filters.categoryIds, filters.subcategoryIds])

  const filteredCards = useMemo(() => {
    const teachSkillIds = new Set(filteredTeachSkills.map((s) => s.id))
    const filtered = allCards.filter((card) => teachSkillIds.has(card.skillId))
    return [...filtered].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  }, [filteredTeachSkills, allCards])

  const activeFilterItems = useMemo<ActiveFilter[]>(() => {
    const items: ActiveFilter[] = []

    if (filters.mode !== 'all') {
      items.push({
        id: `mode-${filters.mode}`,
        label: MODE_LABELS[filters.mode],
        onRemove: () => dispatch(setMode('all')),
      })
    }

    for (const categoryId of filters.categoryIds) {
      const category = SKILL_CATEGORIES.find((c) => c.id === categoryId)
      if (category) {
        items.push({
          id: `category-${categoryId}`,
          label: category.title,
          onRemove: () =>
            dispatch(
              toggleCategory({
                categoryId,
                subcategoryIds: category.subcategories.map((s) => s.id),
              }),
            ),
        })
      }
    }

    for (const subcategoryId of filters.subcategoryIds) {
      let subcategoryTitle = subcategoryId
      let parentCategory = SKILL_CATEGORIES[0]
      for (const category of SKILL_CATEGORIES) {
        const sub = category.subcategories.find((s) => s.id === subcategoryId)
        if (sub) {
          subcategoryTitle = sub.title
          parentCategory = category
          break
        }
      }
      const finalTitle = subcategoryTitle
      const finalParent = parentCategory
      items.push({
        id: `subcategory-${subcategoryId}`,
        label: finalTitle,
        onRemove: () =>
          dispatch(
            toggleSubcategory({
              categoryId: finalParent.id,
              subcategoryId,
              subcategoryIds: finalParent.subcategories.map((s) => s.id),
            }),
          ),
      })
    }

    if (filters.gender !== 'any') {
      items.push({
        id: `gender-${filters.gender}`,
        label: GENDER_LABELS[filters.gender],
        onRemove: () => dispatch(setGender('any')),
      })
    }

    for (const city of filters.cities) {
      items.push({
        id: `city-${city}`,
        label: city,
        onRemove: () => dispatch(toggleCity(city)),
      })
    }

    return items
  }, [filters, dispatch])

  const handleSetMode = (mode: string) => dispatch(setMode(mode as FilterMode))
  const handleToggleCategory = (categoryId: string, subcategoryIds: string[]) =>
    dispatch(toggleCategory({ categoryId, subcategoryIds }))
  const handleToggleSubcategory = (
    categoryId: string,
    subcategoryId: string,
    subcategoryIds: string[],
  ) => dispatch(toggleSubcategory({ categoryId, subcategoryId, subcategoryIds }))
  const handleSetGender = (gender: string) => dispatch(setGender(gender as GenderFilter))
  const handleToggleCity = (city: City) => dispatch(toggleCity(city))

  return (
    <CatalogPageUI
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogin={onLogin}
      onRegister={onRegister}
      onProfileClick={onProfileClick}
      onFavoritesClick={onFavoritesClick}
      filters={filters}
      activeFiltersCount={activeFiltersCount}
      categories={SKILL_CATEGORIES}
      categoryStates={categoryStates}
      cities={cities}
      onSetMode={handleSetMode}
      onToggleCategory={handleToggleCategory}
      onToggleSubcategory={handleToggleSubcategory}
      onSetGender={handleSetGender}
      onToggleCity={handleToggleCity}
      onReset={handleReset}
      hasActiveFilters={hasActiveFilters}
      activeFilterItems={activeFilterItems}
      filteredCards={filteredCards}
      filteredCount={filteredCards.length}
      allCards={allCards}
      recommendationCards={visibleCards}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      loadMoreRef={loadMoreRef}
      popularCards={popularCards}
      newCards={newCards}
      isLoading={usersLoading || skillsLoading}
      loadError={usersError ?? skillsError}
      onShowPopular={() => undefined}
      onShowNew={() => undefined}
      onCardDetailsClick={handleCardDetailsClick}
    />
  )
}
