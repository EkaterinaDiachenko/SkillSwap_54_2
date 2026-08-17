import { UserSummary, type UserSummaryProps } from '@/entities/user/ui/user-summary'
import {
  SkillExchangeInfo,
  type SkillExchangeInfoProps,
} from '@/entities/user/ui/skill-exchange-info'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './skill-card.module.css'

export type SkillCardProps = UserSummaryProps &
  SkillExchangeInfoProps & {
  likesCount: number
  onDetailsClick?: () => void
  className?: string
}

export function SkillCard({
  name,
  city,
  age,
  avatarUrl,
  likesCount,
  canTeach,
  wantsToLearn,
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
        />
        <div className={styles.likeControl}>
          <span className={styles.likesCount}>{likesCount}</span>
          <IconButton
            iconName="like"
            aria-label="Поставить лайк"
            className={styles.likeButton}
          />
        </div>
      </div>

      <SkillExchangeInfo canTeach={canTeach} wantsToLearn={wantsToLearn} />

      <Button variant="primary" onClick={onDetailsClick}>
        Подробнее
      </Button>
    </article>
  )
}
