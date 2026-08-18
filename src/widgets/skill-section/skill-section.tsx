import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { SkillCard, type SkillCardProps } from '@/entities/skill/ui/skill-card'
import styles from './skill-section.module.css'

export interface SkillSectionProps {
  /** Заголовок секции  */
  title: string
  /** Массив карточек для отображения */
  skillCards: SkillCardProps[]
  /** Колбэк при клике на "Смотреть все" */
  onShowAll?: () => void
  /** Дополнительный CSS-класс */
  className?: string
}

export function SkillSection({
  title,
  skillCards,
  onShowAll,
  className,
}: SkillSectionProps) {
  return (
    <section className={[styles.section, className].filter(Boolean).join(' ')}>
      {/* Заголовок секции с кнопкой "Смотреть все" */}
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <Button
          variant="tertiary"
          onClick={onShowAll}
          className={styles.showAllButton}
        >
          <span>Смотреть все</span>
          <Icon name="chevron-right" size={20} />
        </Button>
      </div>

      {/* Сетка карточек */}
      <div className={styles.cardsGrid}>
        {skillCards.map((card, index) => (
          <SkillCard
            key={index}
            {...card}
            className={styles.skillCard}
          />
        ))}
      </div>

      {/* 
        ═══════════════════════════════════════════════════════
        МЕСТО ДЛЯ БУДУЩИХ ДОПОЛНИТЕЛЬНЫХ КАРТОЧЕК
        ═══════════════════════════════════════════════════════
        Здесь будут появляться дополнительные карточки
        при клике на кнопку "Смотреть все".
        
        Логика будет добавлена позже.
        При раскрытии секция сдвинет блоки ниже.
        ═══════════════════════════════════════════════════════
      */}
      {/* 
      <div className={styles.extraCards}>
        {extraCards.map((card, index) => (
          <SkillCard
            key={index}
            {...card}
            className={styles.skillCard}
          />
        ))}
      </div>
      */}
    </section>
  )
}