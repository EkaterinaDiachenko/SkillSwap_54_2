import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import { SkillCard, type SkillCardProps } from '@/widgets/skill-card'
import styles from './skill-section.module.css'

export interface SkillSectionProps {
  /** Заголовок секции (например, "Популярное" / "Новое") */
  title: string
  /** Массив карточек для отображения */
  skillCards: Array<SkillCardProps & { skillId: string }>
  /** Колбэк при клике на "Смотреть все" */
  onShowAll: () => void
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
          Смотреть все
          <Icon name="chevron-right" size={24} />
        </Button>
      </div>

      {/* Сетка карточек */}
      <div className={styles.cards}>
        {skillCards.map((card) => (
          <SkillCard
            key={card.skillId}
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
