import { Avatar } from '@/shared/ui/avatar'
import styles from './user-summary.module.css'

export type UserSummaryProps = {
  name: string
  city: string
  age: number
  avatarUrl?: string | null
  className?: string
}

function pluralYears(n: number): string {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return 'год'
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'года'
  return 'лет'
}

export function UserSummary({
  name,
  city,
  age,
  avatarUrl,
  className,
}: UserSummaryProps) {
  const subtitle = `${city}, ${age} ${pluralYears(age)}`

  return (
    <div className={`${styles.userSummary} ${className ?? ''}`}>
      <Avatar src={avatarUrl ?? undefined} alt={name} name={name} size="lg" />
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.details}>{subtitle}</p>
      </div>
    </div>
  )
}
