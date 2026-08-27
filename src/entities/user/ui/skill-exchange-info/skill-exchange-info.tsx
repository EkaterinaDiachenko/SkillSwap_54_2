import { Tag, type Color } from '@/shared/ui/tag'
import styles from './skill-exchange-info.module.css'

export type SkillTagData = {
  title: string
  color: Color
}

export type SkillExchangeInfoProps = {
  canTeach: SkillTagData[]
  wantsToLearn: SkillTagData[]
}

export function SkillExchangeInfo({
  canTeach,
  wantsToLearn,
}: SkillExchangeInfoProps) {
  const skillCanTeach = canTeach[0]
  const skillsWantsToLearn = wantsToLearn.slice(0, 2)
  const otherSkills =
    wantsToLearn.length - skillsWantsToLearn.length

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h4 className={styles.title}>Может научить:</h4>

        {skillCanTeach && (
          <Tag
            label={skillCanTeach.title}
            color={skillCanTeach.color}
          />
        )}
      </div>

      <div className={styles.section}>
        <h4 className={styles.title}>Хочет научиться:</h4>

        <div className={styles.tags}>
          {skillsWantsToLearn.map((skill, index) => (
            <Tag
              key={`${skill.title}-${index}`}
              label={skill.title}
              color={skill.color}
            />
          ))}

          {otherSkills > 0 && (
            <Tag label={`+${otherSkills}`} color="more" />
          )}
        </div>
      </div>
    </div>
  )
}