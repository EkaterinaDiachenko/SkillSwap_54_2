import type { SkillCategory } from '@/entities/skill'
import { HeaderFiltersBar } from '@/shared/ui/header-filters-bar'
import { RadioButtons } from '@/shared/ui/radio-buttons'
import { Checkbox, CheckboxGroup } from '@/shared/ui/checkbox'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './filters-bar.module.css'

/** Выбранные фильтры — структура уточнится при подключении данных */
export type FiltersBarSelectedFilters = {
  mode?: string
  gender?: string
  skillIds?: string[]
  cityIds?: string[]
}

export type FiltersBarProps = {
  selectedFilters: FiltersBarSelectedFilters
  onFilterChange: (next: FiltersBarSelectedFilters) => void
  onReset: () => void
  skillsCategories: SkillCategory[]
  cities: Array<string | { id: string; name: string }>
  className?: string
}

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

/** Статичная разметка категорий (пока без данных из props) */
const STATIC_SKILL_ROWS = [
  { id: 'business', title: 'Бизнес и карьера', expandable: true, open: false },
  {
    id: 'art',
    title: 'Творчество и искусство',
    expandable: true,
    open: true,
    indeterminate: true,
    children: [
      'Рисование и иллюстрация',
      'Фотография',
      'Видеомонтаж',
      'Музыка и звук',
      'Актёрское мастерство',
      'Креативное письмо',
      'Арт-терапия',
      'Декор и DIY',
    ],
    checkedChild: 'Музыка и звук',
  },
  { id: 'languages', title: 'Иностранные языки', expandable: true, open: false },
  { id: 'education', title: 'Образование и развитие', expandable: true, open: false },
  { id: 'health', title: 'Здоровье и лайфстайл', expandable: true, open: false },
  { id: 'home', title: 'Дом и уют', expandable: true, open: false },
] as const

const STATIC_CITIES = [
  'Москва',
  'Санкт-Петербург',
  'Новосибирск',
  'Екатеринбург',
  'Казань',
]

function countSelected(filters: FiltersBarSelectedFilters): number {
  let count = 0
  if (filters.mode && filters.mode !== 'all') count += 1
  if (filters.gender && filters.gender !== 'any') count += 1
  count += filters.skillIds?.length ?? 0
  count += filters.cityIds?.length ?? 0
  return count
}

const noopChange = () => {
  /* клики без логики — состояние фильтров подключат позже */
}

/**
 * Панель фильтров каталога (статичная вёрстка).
 * Раскрытие категорий и реакция на «Все категории/города» — позже, с данными.
 */
export function FiltersBar({
  selectedFilters,
  onFilterChange: _onFilterChange,
  onReset,
  skillsCategories: _skillsCategories,
  cities: _cities,
  className,
}: FiltersBarProps) {
  const selectedCount = countSelected(selectedFilters)
  const mode = selectedFilters.mode ?? 'learn'
  const gender = selectedFilters.gender ?? 'any'

  return (
    <aside
      className={[styles.bar, className].filter(Boolean).join(' ')}
      aria-label="Фильтры каталога"
    >
      <HeaderFiltersBar
        className={styles.header}
        selectedCount={selectedCount}
        onReset={onReset}
      />

      {/* Список фильтров: от «Всё» до низа. Карточка тянется ниже по каталогу. */}
      <div className={styles.body}>
        {/* Место под чипы активных фильтров (Tag) — появится позже */}
        {/* <div className={styles.activeChips} /> */}

        <div className={styles.modeFilter}>
          <RadioButtons
            name="filterMode"
            options={MODE_OPTIONS}
            value={mode}
            onChange={noopChange}
          />
        </div>

        <CheckboxGroup title="Навыки">
          {STATIC_SKILL_ROWS.map((row) => (
            <div key={row.id} className={styles.skillBlock}>
              <div className={styles.categoryRow}>
                <div className={styles.categoryCheckbox}>
                  <Checkbox
                    checked={false}
                    indeterminate={'indeterminate' in row && row.indeterminate}
                    onChange={noopChange}
                    label={row.title}
                  />
                </div>
                {row.expandable && (
                  <IconButton
                    iconName="chevron-down"
                    aria-label={
                      row.open
                        ? `Свернуть категорию ${row.title}`
                        : `Раскрыть категорию ${row.title}`
                    }
                    className={[
                      styles.chevronButton,
                      row.open ? styles.chevronOpen : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                  />
                )}
              </div>

              {/* Статично открытая секция подкатегорий */}
              {'open' in row && row.open && 'children' in row && row.children && (
                <div className={styles.subList}>
                  {row.children.map((sub) => (
                    <Checkbox
                      key={sub}
                      checked={
                        'checkedChild' in row && row.checkedChild === sub
                      }
                      onChange={noopChange}
                      label={sub}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Место для дополнительных чекбоксов категорий (логика позже) */}
          <div className={styles.extraSlot} aria-hidden>
            {/* сюда добавятся остальные категории из skillsCategories */}
          </div>

          <div className={styles.moreRow}>
            <Button
              type="button"
              variant="quaternary"
              className={styles.moreButton}
            >
              Все категории
            </Button>
            <IconButton
              iconName="chevron-down"
              aria-label="Все категории"
              className={styles.chevronButton}
            />
          </div>
        </CheckboxGroup>

        <RadioButtons
          name="Пол автора"
          options={GENDER_OPTIONS}
          value={gender}
          onChange={noopChange}
        />

        <CheckboxGroup title="Город">
          {STATIC_CITIES.map((city) => (
            <Checkbox
              key={city}
              checked={false}
              onChange={noopChange}
              label={city}
            />
          ))}

          {/* Место для дополнительных городов из props.cities */}
          <div className={styles.extraSlot} aria-hidden>
            {/* сюда добавятся города из props */}
          </div>

          <div className={styles.moreRow}>
            <Button
              type="button"
              variant="quaternary"
              className={styles.moreButton}
            >
              Все города
            </Button>
            <IconButton
              iconName="chevron-down"
              aria-label="Все города"
              className={styles.chevronButton}
            />
          </div>
        </CheckboxGroup>
      </div>
    </aside>
  )
}
