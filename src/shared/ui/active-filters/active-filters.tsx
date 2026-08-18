import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './active-filters.module.css'

export type ActiveFiltersProps = {
  selectedFilters: string[]
  onRemoveFilter: (filter: string) => void
  className?: string
}

export function ActiveFilters({
  selectedFilters,
  onRemoveFilter,
  className,
}: ActiveFiltersProps) {
  if (selectedFilters.length === 0) {
    return null
  }

  return (
    <div
      className={[styles.container, className].filter(Boolean).join(' ')}
      role="group"
      aria-label="Выбранные фильтры"
      aria-live="polite"
      aria-atomic="true"
    >
      {selectedFilters.map((filter) => (
        <Button
          key={filter}
          type="button"
          variant="tertiary"
          aria-label={`Удалить фильтр ${filter}`}
          onClick={() => onRemoveFilter(filter)}
        >
          <span>{filter}</span>
          <Icon
            name="cross"
            size={16}
            className={styles.closeIcon}
          />
        </Button>
      ))}
    </div>
  )
}
