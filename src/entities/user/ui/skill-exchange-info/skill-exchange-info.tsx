import { Tag, type Color } from '@/shared/ui/tag'
import styles from './skill-exchange-info.module.css'

export type SkillExchangeInfoProps = {
  canTeach: string[]
  wantsToLearn: string[]
}

const tagColors: Color[] = [
  'art',
  'education',
  'health',
  'business',
  'languages',
  'home',
]

export function SkillExchangeInfo({ canTeach, wantsToLearn }: SkillExchangeInfoProps) {

  const skillCanTeach = canTeach[0]
  const skillsWantsToLearn = wantsToLearn.slice(0, 2)
  const otherSkills = wantsToLearn.length - skillsWantsToLearn.length

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.title}>Может научить:</h4>
        {skillCanTeach && <Tag label={skillCanTeach} color={tagColors[0]} />}
      </div>

      <div className={styles.section}>
        <h4 className={styles.title}>Хочет научиться:</h4>

        <div className={styles.tags}>
        {skillsWantsToLearn.map((skill, index) => (
          <Tag
            key={`${skill}-${index}`}
            label={skill}
            color={tagColors[(index + 1) % tagColors.length]}
          />
        ))}

        {otherSkills > 0 && (<Tag label={`+${otherSkills}`} color='more' />)}
      </div>
    </div>
    </div>
  )
}