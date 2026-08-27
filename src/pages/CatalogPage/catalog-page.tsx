import type { SkillCategory } from '@/entities/skill'
import type { CatalogFilters } from '@/features/catalog-filters/model/types'
import type { CategoryFilterState, CatalogCard } from '@/features/catalog-filters/model'
import type { City } from '@/shared/types'
import { FiltersBar } from '@/widgets/filters-bar'
import { Footer } from '@/widgets/footer'
import { AuthHeader, Header } from '@/widgets/header'
import { SkillSection } from '@/widgets/skill-section'
import { FilteredCardsSection } from '@/widgets/filtered-cards-section'
import { ActiveFilters, type ActiveFilter } from '@/shared/ui/active-filters'
import styles from './catalog-page.module.css'

export type CatalogPageUIProps = {
  isAuth: boolean
  userName?: string
  avatarSrc?: string

  filters: CatalogFilters
  activeFiltersCount: number
  hasActiveFilters: boolean
  categories: SkillCategory[]
  categoryStates: Record<string, CategoryFilterState>
  availableCities: City[]

  filteredCards: CatalogCard[]
  filteredCount: number

  onSetMode: (mode: string) => void
  onToggleCategory: (categoryId: string, subcategoryIds: string[]) => void
  onToggleSubcategory: (categoryId: string, subcategoryId: string, subcategoryIds: string[]) => void
  onSetGender: (gender: string) => void
  onToggleCity: (city: City) => void
  onResetFilters: () => void
}

function buildActiveFiltersList(
  filters: CatalogFilters,
  categories: SkillCategory[],
  onRemoveFilter: (type: string, payload?: unknown) => void,
): ActiveFilter[] {
  const result: ActiveFilter[] = []

  if (filters.mode !== 'all') {
    const modeLabel =
      filters.mode === 'learn' ? 'Хочу научиться' : 'Могу научить'
    result.push({
      id: `mode-${filters.mode}`,
      label: modeLabel,
      onRemove: () => onRemoveFilter('mode'),
    })
  }

  for (const catId of filters.categoryIds) {
    const category = categories.find((c) => c.id === catId)
    if (category) {
      result.push({
        id: `category-${catId}`,
        label: category.title,
        onRemove: () => onRemoveFilter('category', catId),
      })
    }
  }

  for (const subId of filters.subcategoryIds) {
    for (const cat of categories) {
      const sub = cat.subcategories.find((s) => s.id === subId)
      if (sub) {
        result.push({
          id: `subcategory-${subId}`,
          label: sub.title,
          onRemove: () => onRemoveFilter('subcategory', subId),
        })
        break
      }
    }
  }

  if (filters.gender !== 'any') {
    const genderLabel = filters.gender === 'male' ? 'Мужской' : 'Женский'
    result.push({
      id: `gender-${filters.gender}`,
      label: genderLabel,
      onRemove: () => onRemoveFilter('gender'),
    })
  }

  for (const city of filters.cities) {
    result.push({
      id: `city-${city}`,
      label: city,
      onRemove: () => onRemoveFilter('city', city),
    })
  }

  return result
}

export function CatalogPageUI({
  isAuth,
  userName,
  avatarSrc,
  filters,
  activeFiltersCount,
  hasActiveFilters,
  categories,
  categoryStates,
  availableCities,
  filteredCards,
  filteredCount,
  onSetMode,
  onToggleCategory,
  onToggleSubcategory,
  onSetGender,
  onToggleCity,
  onResetFilters,
}: CatalogPageUIProps) {
  const handleRemoveFilter = (type: string, payload?: unknown) => {
    switch (type) {
      case 'mode':
        onSetMode('all')
        break
      case 'gender':
        onSetGender('any')
        break
      case 'category': {
        const catId = payload as string
        const cat = categories.find((c) => c.id === catId)
        if (cat) {
          onToggleCategory(catId, cat.subcategories.map((s) => s.id))
        }
        break
      }
      case 'subcategory': {
        const subId = payload as string
        const parentCat = categories.find((c) =>
          c.subcategories.some((s) => s.id === subId),
        )
        if (parentCat) {
          onToggleSubcategory(parentCat.id, subId, parentCat.subcategories.map((s) => s.id))
        }
        break
      }
      case 'city':
        onToggleCity(payload as City)
        break
    }
  }

  const activeFiltersList = hasActiveFilters
    ? buildActiveFiltersList(filters, categories, handleRemoveFilter)
    : []

  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName ?? ''}
          avatarSrc={avatarSrc}
          categories={categories}
        />
      ) : (
        <Header categories={categories} />
      )}

      <main className={styles.main}>
        <FiltersBar
          filters={filters}
          activeFiltersCount={activeFiltersCount}
          categories={categories}
          categoryStates={categoryStates}
          cities={availableCities}
          onSetMode={onSetMode}
          onToggleCategory={onToggleCategory}
          onToggleSubcategory={onToggleSubcategory}
          onSetGender={onSetGender}
          onToggleCity={onToggleCity}
          onReset={onResetFilters}
        />

        <div className={styles.content}>
          {hasActiveFilters ? (
            <>
              <ActiveFilters filters={activeFiltersList} />
              <FilteredCardsSection
                filteredCount={filteredCount}
                cards={filteredCards}
              />
            </>
          ) : (
            <>
              <SkillSection
                title="Популярное"
                skillCards={[]}
                onShowAll={() => undefined}
              />

              <SkillSection
                title="Новое"
                skillCards={[]}
                onShowAll={() => undefined}
              />

              <SkillSection
                title="Рекомендуем"
                skillCards={[]}
                onShowAll={() => undefined}
              />
            </>
          )}
        </div>
      </main>

      <Footer categories={categories} />
    </div>
  )
}
