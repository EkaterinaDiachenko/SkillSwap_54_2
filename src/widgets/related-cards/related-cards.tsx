import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import { IconButton } from '@/shared/ui/icon-button'
import { Tag } from '@/shared/ui/tag'
import styles from './related-cards.module.css'

const VISIBLE_COUNT = 4

export type RelatedCard = SkillCardProps & {
  skillId: string
}

export type RelatedCardsProps = {
  cards: RelatedCard[]
  title?: string
  onCardDetailsClick: (skillId: string) => void
  onShowMore?: () => void
  className?: string
}

export function RelatedCards({
  cards,
  title = 'Похожие предложения',
  onShowMore,
  onCardDetailsClick,
  className,
}: RelatedCardsProps) {
  const hasMore = cards.length > VISIBLE_COUNT

  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.row}>
        <div className={styles.track}>
          {cards.map((card, index) => (
            <SkillCard
              key={`${card.name}-${index}`}
              className={styles.card}
              {...card}
              onDetailsClick={() => onCardDetailsClick(card.skillId)}
            />
          ))}
        </div>

        {hasMore && (
          <Tag
            color="more"
            className={styles.moreTag}
            content={
              <IconButton
                iconName="chevron-right"
                aria-label="Показать ещё"
                className={styles.moreButton}
                onClick={onShowMore}
              />
            }
          />
        )}
      </div>
    </section>
  )
}
