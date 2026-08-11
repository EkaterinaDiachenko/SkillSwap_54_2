import styles from './avatar.module.css'

export type AvatarSize = 'sm' | 'lg'

export type AvatarProps = {
  src?: string
  alt: string
  size?: AvatarSize
  /** Для fallback (инициалы), если нет src */
  name?: string
  className?: string
}

const sizeClass: Record<AvatarSize, string> = {
  sm: styles.sm,
  lg: styles.lg,
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)

  if (parts.length === 0) {
    return '?'
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

/** Пример: <Avatar src="/avatars/avatar-01.png" alt="Иван" size="sm" /> */
export function Avatar({
  src,
  alt,
  size = 'sm',
  name,
  className,
}: AvatarProps) {
  const classNames = [styles.avatar, sizeClass[size], className]
    .filter(Boolean)
    .join(' ')

  if (src) {
    return <img className={classNames} src={src} alt={alt} />
  }

  const initials = getInitials(name ?? alt)

  return (
    <span className={classNames} role="img" aria-label={alt}>
      <span className={styles.initials}>{initials}</span>
    </span>
  )
}
