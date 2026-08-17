import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './header-filters-bar.module.css'

export type HeaderFiltersBarProps = {
  selectedCount: number
  onReset: () => void
  className?: string
}

export function HeaderFiltersBar({
  selectedCount,
  onReset,
  className,
}: HeaderFiltersBarProps) {
  const hasSelected = selectedCount > 0

  return (
    <div className={[styles.bar, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>
        Фильтры
        {hasSelected && (
          <span className={styles.counter}> ({selectedCount})</span>
        )}
      </h2>

      {hasSelected && (
        <Button
          type="button"
          variant="quaternary"
          className={styles.resetButton}
          onClick={onReset}
        >
          <span>Сбросить</span>
          <Icon name="cross" size={24} className={styles.resetIcon} />
        </Button>
      )}
    </div>
  )
}
