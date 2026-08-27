import { Spinner } from '@/shared/ui/spinner'
import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import styles from './recommendation-section.module.css'

export type RecommendationSectionProps = {
  skillCards: Array<SkillCardProps & { skillId: string }>
  isLoading: boolean
  className?: string
}

export function RecommendationSection({
  skillCards,
  isLoading,
  className,
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
          />
        ))}
      </div>

      {isLoading && <Spinner />}
    </section>
  )
}
