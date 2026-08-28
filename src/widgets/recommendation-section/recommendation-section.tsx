import { Spinner } from '@/shared/ui/spinner'
import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import styles from './recommendation-section.module.css'
import type { RefObject } from 'react'

export type RecommendationSectionProps = {
  skillCards: Array<SkillCardProps & { skillId: string }>
  isLoadingMore: boolean
  hasMore: boolean
  loadMoreRef: RefObject<HTMLDivElement>
  onCardDetailsClick: (skillId: string) => void
  className?: string
}

export function RecommendationSection({
  skillCards,
  className,
  isLoadingMore,
  hasMore,
  loadMoreRef,
  onCardDetailsClick,
}: RecommendationSectionProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>Рекомендуем</h2>
      <div className={styles.container}>
        {skillCards.map((card) => (
          <SkillCard
            key={card.skillId}
            {...card}
            className={styles.skillCard}
            onDetailsClick={() => onCardDetailsClick(card.skillId)}
          />
        ))}
      </div>

      {hasMore && (
        <div
          ref={loadMoreRef}
          className={styles.loadMoreTrigger}
          aria-hidden="true"
        />
      )}

      {isLoadingMore && <Spinner />}
    </section>
  )
}
