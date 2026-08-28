import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './active-filters.module.css'

export type ActiveFilter = {
  id: string
  label: string
  onRemove: () => void
}

export type ActiveFiltersProps = {
  filters: ActiveFilter[]
  className?: string
}

export function ActiveFilters({
  filters,
  className,
}: ActiveFiltersProps) {
  if (filters.length === 0) {
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
      {filters.map((filter) => (
        <Button
          key={filter.id}
          type="button"
          variant="tertiary"
          aria-label={`Удалить фильтр ${filter.label}`}
          onClick={filter.onRemove}
        >
          <span>{filter.label}</span>
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
