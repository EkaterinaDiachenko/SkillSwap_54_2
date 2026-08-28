import type { SkillCategory } from '@/entities/skill'
import type { CatalogFilters } from '@/features/catalog-filters/model/types'
import type { CategoryFilterState } from '@/features/catalog-filters/model'
import type { City } from '@/shared/types'
import { Spinner } from '@/shared/ui/spinner'
import { ActiveFilters, type ActiveFilter } from '@/shared/ui/active-filters'
import { FiltersBar } from '@/widgets/filters-bar'
import { FilteredCardsSection } from '@/widgets/filtered-cards-section'
import { Footer } from '@/widgets/footer'
import { AuthHeader, Header } from '@/widgets/header'
import { RecommendationSection } from '@/widgets/recommendation-section'
import { SkillSection } from '@/widgets/skill-section'
import type { CatalogCard } from '@/features/catalog/model'
import styles from './catalog-page.module.css'
import type { RefObject } from 'react'

export type CatalogPageProps = {
  isAuth: boolean

  userName?: string
  avatarSrc?: string

  filters: CatalogFilters
  activeFiltersCount: number
  categories: SkillCategory[]
  categoryStates: Record<string, CategoryFilterState>
  cities: City[]
  onSetMode: (mode: string) => void
  onToggleCategory: (categoryId: string, subcategoryIds: string[]) => void
  onToggleSubcategory: (categoryId: string, subcategoryId: string, subcategoryIds: string[]) => void
  onSetGender: (gender: string) => void
  onToggleCity: (city: City) => void
  onReset: () => void

  hasActiveFilters: boolean
  activeFilterItems: ActiveFilter[]

  filteredCards: CatalogCard[]
  filteredCount: number

  allCards: CatalogCard[]
  recommendationCards: CatalogCard[]
  popularCards: CatalogCard[]
  newCards: CatalogCard[]

  isLoading: boolean
  loadError?: string | null
  isLoadingMore: boolean
  hasMore: boolean
  loadMoreRef: RefObject<HTMLDivElement>

  onShowPopular: () => void
  onShowNew: () => void
  onCardDetailsClick: (skillId: string) => void

  onLogin: () => void
  onRegister: () => void
  onProfileClick: () => void
  onFavoritesClick: () => void
}

export function CatalogPageUI({
  isAuth,
  userName,
  avatarSrc,
  filters,
  activeFiltersCount,
  categories,
  categoryStates,
  cities,
  onSetMode,
  onToggleCategory,
  onToggleSubcategory,
  onSetGender,
  onToggleCity,
  onReset,
  hasActiveFilters,
  activeFilterItems,
  filteredCards,
  filteredCount,
  recommendationCards,
  popularCards,
  newCards,
  allCards,
  isLoading,
  loadError,
  onShowPopular,
  onShowNew,
  onCardDetailsClick,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  isLoadingMore,
  hasMore,
  loadMoreRef,
}: CatalogPageProps) {
  const isEmpty = !isLoading && !loadError && allCards.length === 0
  const shouldShowSections = !isLoading && !loadError && allCards.length > 0

  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName ?? ''}
          avatarSrc={avatarSrc}
          categories={categories}
          onProfileClick={onProfileClick}
          onFavoritesClick={onFavoritesClick}
        />
      ) : (
        <Header
          categories={categories}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      )}

      <main className={styles.main}>
        <FiltersBar
          filters={filters}
          activeFiltersCount={activeFiltersCount}
          categories={categories}
          categoryStates={categoryStates}
          cities={cities}
          onSetMode={onSetMode}
          onToggleCategory={onToggleCategory}
          onToggleSubcategory={onToggleSubcategory}
          onSetGender={onSetGender}
          onToggleCity={onToggleCity}
          onReset={onReset}
        />

        <div className={styles.content}>
          {isLoading && <Spinner />}

          {loadError && (
            <p className={styles.message}>Не удалось загрузить предложения</p>
          )}

          {isEmpty && <p className={styles.message}>Предложений пока нет</p>}

          {shouldShowSections && hasActiveFilters && (
            <>
              <ActiveFilters filters={activeFilterItems} />
              <FilteredCardsSection
                filteredCount={filteredCount}
                cards={filteredCards}
                onCardDetailsClick={onCardDetailsClick}
              />
            </>
          )}

          {shouldShowSections && !hasActiveFilters && (
            <>
              <SkillSection
                title="Популярное"
                skillCards={popularCards}
                onShowAll={onShowPopular}
                onCardDetailsClick={onCardDetailsClick}
              />

              <SkillSection
                title="Новое"
                skillCards={newCards}
                onShowAll={onShowNew}
                onCardDetailsClick={onCardDetailsClick}
              />

              <RecommendationSection
                skillCards={recommendationCards}
                isLoadingMore={isLoadingMore}
                hasMore={hasMore}
                loadMoreRef={loadMoreRef}
                onCardDetailsClick={onCardDetailsClick}
              />
            </>
          )}
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}

export default CatalogPageUI
