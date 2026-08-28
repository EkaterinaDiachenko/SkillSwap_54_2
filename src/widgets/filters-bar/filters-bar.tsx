import { useState, useCallback } from 'react'
import type { SkillCategory } from '@/entities/skill'
import type { CatalogFilters, FilterMode, GenderFilter } from '@/features/catalog-filters/model/types'
import type { CategoryFilterState } from '@/features/catalog-filters/model'
import type { City } from '@/shared/types'
import { HeaderFiltersBar } from '@/shared/ui/header-filters-bar'
import { RadioButtons } from '@/shared/ui/radio-buttons'
import { Checkbox, CheckboxGroup } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './filters-bar.module.css'

const MODE_OPTIONS = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
]

const GENDER_OPTIONS = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
]

const VISIBLE_CITIES_COUNT = 5

export type FiltersBarProps = {
  filters: CatalogFilters
  activeFiltersCount: number
  categories: SkillCategory[]
  categoryStates: Record<string, CategoryFilterState>
  cities: City[]
  onSetMode: (mode: FilterMode) => void
  onToggleCategory: (categoryId: string, subcategoryIds: string[]) => void
  onToggleSubcategory: (categoryId: string, subcategoryId: string, subcategoryIds: string[]) => void
  onSetGender: (gender: GenderFilter) => void
  onToggleCity: (city: City) => void
  onReset: () => void
  className?: string
}

export function FiltersBar({
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
  className,
}: FiltersBarProps) {
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<Set<string>>(new Set())
  const [allCitiesExpanded, setAllCitiesExpanded] = useState(false)

  const handleToggleCategoryExpand = useCallback((categoryId: string) => {
    setExpandedCategoryIds((prev) => {
      const next = new Set(prev)
      if (next.has(categoryId)) {
        next.delete(categoryId)
      } else {
        next.add(categoryId)
      }
      return next
    })
  }, [])

  const allCategoriesExpanded = categories.every((c) => expandedCategoryIds.has(c.id))

  const handleToggleAllCategories = useCallback(() => {
    if (allCategoriesExpanded) {
      setExpandedCategoryIds(new Set())
    } else {
      setExpandedCategoryIds(new Set(categories.map((c) => c.id)))
    }
  }, [allCategoriesExpanded, categories])

  const handleToggleAllCities = useCallback(() => {
    setAllCitiesExpanded((prev) => !prev)
  }, [])

  const visibleCities = allCitiesExpanded ? cities : cities.slice(0, VISIBLE_CITIES_COUNT)

  return (
    <aside
      className={[styles.bar, className].filter(Boolean).join(' ')}
      aria-label="Фильтры каталога"
    >
      <HeaderFiltersBar
        className={styles.header}
        selectedCount={activeFiltersCount}
        onReset={onReset}
      />

      <div className={styles.body}>
        <div className={styles.modeFilter}>
          <RadioButtons
            name="filterMode"
            options={MODE_OPTIONS}
            value={filters.mode}
            onChange={onSetMode as (value: string) => void}
          />
        </div>

        <CheckboxGroup title="Навыки">
          {categories.map((category) => {
            const isExpanded = expandedCategoryIds.has(category.id)
            const state = categoryStates[category.id] ?? { checked: false, indeterminate: false }

            return (
              <div key={category.id} className={styles.skillBlock}>
                <div className={styles.categoryRow}>
                  <div className={styles.categoryCheckbox}>
                    <Checkbox
                      checked={state.checked}
                      indeterminate={state.indeterminate}
                      onChange={() => onToggleCategory(category.id, category.subcategories.map((s) => s.id))}
                      label={category.title}
                    />
                  </div>
                  <IconButton
                    iconName="chevron-down"
                    aria-label={
                      isExpanded
                        ? `Свернуть категорию ${category.title}`
                        : `Раскрыть категорию ${category.title}`
                    }
                    className={[styles.chevronButton, isExpanded ? styles.chevronOpen : '']
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => handleToggleCategoryExpand(category.id)}
                  />
                </div>

                {isExpanded && (
                  <div className={styles.subList}>
                    {category.subcategories.map((sub) => (
                      <Checkbox
                        key={sub.id}
                        checked={filters.subcategoryIds.includes(sub.id)}
                        onChange={() => onToggleSubcategory(category.id, sub.id, category.subcategories.map((s) => s.id))}
                        label={sub.title}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className={styles.moreRow}>
            <Button
              type="button"
              variant="quaternary"
              className={styles.moreButton}
              onClick={handleToggleAllCategories}
            >
              {allCategoriesExpanded ? 'Свернуть все' : 'Все категории'}
            </Button>
            <IconButton
              iconName="chevron-down"
              aria-label={allCategoriesExpanded ? 'Свернуть все категории' : 'Все категории'}
              className={[styles.chevronButton, allCategoriesExpanded ? styles.chevronOpen : '']
                .filter(Boolean)
                .join(' ')}
              onClick={handleToggleAllCategories}
            />
          </div>
        </CheckboxGroup>

        <RadioButtons
          name="Пол автора"
          options={GENDER_OPTIONS}
          value={filters.gender}
          onChange={onSetGender as (value: string) => void}
        />

        <CheckboxGroup title="Город">
          {visibleCities.map((city) => (
            <Checkbox
              key={city}
              checked={filters.cities.includes(city)}
              onChange={() => onToggleCity(city)}
              label={city}
            />
          ))}

          <div className={styles.moreRow}>
            <Button
              type="button"
              variant="quaternary"
              className={styles.moreButton}
              onClick={handleToggleAllCities}
            >
              {allCitiesExpanded ? 'Свернуть' : 'Все города'}
            </Button>
            <IconButton
              iconName="chevron-down"
              aria-label={allCitiesExpanded ? 'Свернуть список городов' : 'Все города'}
              className={[styles.chevronButton, allCitiesExpanded ? styles.chevronOpen : '']
                .filter(Boolean)
                .join(' ')}
              onClick={handleToggleAllCities}
            />
          </div>
        </CheckboxGroup>
      </div>
    </aside>
  )
}
