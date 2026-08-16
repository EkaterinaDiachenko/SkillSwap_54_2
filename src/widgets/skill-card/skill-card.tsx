import { UserSummary, type UserSummaryProps } from '@/entities/user/ui/user-summary'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './skill-card.module.css'

type SkillCardTag = {
  id: string
  label: string
  color?: 'art' | 'education' | 'health' | 'more'
}

type SkillExchangeInfoProps = {
  teach: SkillCardTag[]
  learn: SkillCardTag[]
}

export type SkillCardProps = UserSummaryProps & {
  likesCount: number
  teach: SkillCardTag[]
  learn: SkillCardTag[]
  isLiked?: boolean
  onLikeClick?: () => void
  onDetailsClick?: () => void
  className?: string
}

function SkillExchangeInfo({ teach, learn }: SkillExchangeInfoProps) {
  return (
    <div className={styles.exchangeInfo}>
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Может научить:</h3>
        <ul className={styles.tags}>
          {teach.map((skill) => (
            <li
              key={skill.id}
              className={[styles.tag, skill.color ? styles[skill.color] : '']
                .filter(Boolean)
                .join(' ')}
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Хочет научиться:</h3>
        <ul className={styles.tags}>
          {learn.map((skill) => (
            <li
              key={skill.id}
              className={[styles.tag, skill.color ? styles[skill.color] : '']
                .filter(Boolean)
                .join(' ')}
            >
              {skill.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function SkillCard({
  name,
  city,
  age,
  avatarUrl,
  likesCount,
  teach,
  learn,
  isLiked = false,
  onLikeClick,
  onDetailsClick,
  className,
}: SkillCardProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')}>
      <div className={styles.summaryWrap}>
        <UserSummary
          name={name}
          city={city}
          age={age}
          avatarUrl={avatarUrl}
          className={styles.summary}
        />
        <div className={styles.likeControl}>
          <span className={styles.likesCount}>{likesCount}</span>
          <IconButton
            iconName="like"
            aria-label="Поставить лайк"
            active={isLiked}
            onClick={onLikeClick}
            className={styles.likeButton}
          />
        </div>
      </div>

      <SkillExchangeInfo teach={teach} learn={learn} />

      <Button variant="primary" className={styles.detailsButton} onClick={onDetailsClick}>
        Подробнее
      </Button>
    </article>
  )
}
