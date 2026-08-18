import { SkillCard, type SkillCardProps } from "@/widgets/skill-card"
import styles from './recommendation-section.module.css'
import { Spinner } from "@/shared/ui/spinner"

export type RecommendationSectionProps = {
skillCards: SkillCardProps[],
isLoading: boolean
className?: string
}

export function RecommendationSection({skillCards, isLoading, className}: RecommendationSectionProps){
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      <h2 className={styles.title}>Рекомендуем</h2>
      <div className={styles.container}>
        {skillCards.map((card, index) => (
          <SkillCard key={`${card.name}-${index}`}{...card} className={styles.skillCard}></SkillCard>
        ))}

      </div>
{isLoading && <Spinner/>}

    </section>

  )
}
