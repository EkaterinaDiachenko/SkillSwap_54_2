import { SkillExchangeInfo } from "@/entities/user/ui/skill-exchange-info"
import { UserSummary } from "@/entities/user/ui/user-summary"
import styles from './skill-owner-card.module.css'

export type SkillOwnerCardProps = {
avatar: string,
name: string,
city: string,
age: number,
about: string,
canTeach: string[],
wantsToLearn: string[],
className?: string,
}


export function SkillOwnerCard({avatar, name, city, age, about, canTeach, wantsToLearn, className}: SkillOwnerCardProps) {
  return (
    <article className={[styles.container, className].filter(Boolean).join(' ')}>
      <UserSummary name={name} city={city} age={age} avatarUrl={avatar}/>
      <p className={styles.about}>{about}</p>
      <SkillExchangeInfo canTeach={canTeach} wantsToLearn={wantsToLearn}/>
    </article>

  )

  }