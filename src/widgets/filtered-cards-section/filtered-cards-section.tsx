import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import styles from './filtered-cards-section.module.css'

export type FilteredCardsSectionProps = {
  filteredCount: number
  cards: SkillCardProps[]
  onSortClick?: () => void
  className?: string
}

export function FilteredCardsSection({
  filteredCount,
  cards,
  onSortClick,
  className,
}: FilteredCardsSectionProps) {
  return (
    <section
      className={[styles.section, className].filter(Boolean).join(' ')}
      aria-label="Подходящие предложения"
    >
      <div className={styles.headerRow}>
        <div className={styles.titleWrap}>
          <h2 className={styles.title}>Подходящие предложения:</h2>
          <span className={styles.counter} aria-live="polite" aria-atomic="true">
            {filteredCount}
          </span>
        </div>

        <Button
          type="button"
          variant="tertiary"
          className={styles.sortButton}
          onClick={onSortClick}
          disabled={!onSortClick}
          aria-label={onSortClick ? 'Сортировать предложения' : 'Сортировка недоступна'}
        >
          <Icon name="sort" size={16} className={styles.sortIcon} />
          <span>Сначала новые</span>
        </Button>
      </div>

      {cards.length > 0 ? (
        <div className={styles.cards}>
          {cards.map((card, index) => (
            <SkillCard
              key={`${card.name}-${index}`}
              {...card}
              className={styles.card}
            />
          ))}
        </div>
      ) : (
        <p className={styles.emptyState}>Подходящих предложений не найдено.</p>
      )}
    </section>
  )
}
