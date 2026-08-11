import type { MouseEventHandler } from 'react'
import { Icon, type IconName } from '@/shared/ui/icon'
import styles from './icon-button.module.css'

export type IconButtonProps = {
  iconName: IconName
  onClick?: MouseEventHandler<HTMLButtonElement>
  'aria-label': string
  active?: boolean
  disabled?: boolean
  className?: string
}

function resolveIconName(iconName: IconName, active: boolean): IconName {
  if (active && iconName === 'like') {
    return 'like-filled'
  }

  if (active && iconName === 'eye') {
    return 'eye-slash'
  }

  return iconName
}

/** Пример: <IconButton iconName="like" aria-label="В избранное" onClick={...} /> */
export function IconButton({
  iconName,
  onClick,
  'aria-label': ariaLabel,
  active = false,
  disabled = false,
  className,
}: IconButtonProps) {
  const name = resolveIconName(iconName, active)
  const isLiked = active && iconName === 'like'

  return (
    <button
      type="button"
      className={[
        styles.button,
        isLiked ? styles.liked : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      disabled={disabled}
    >
      <Icon name={name} size={24} />
    </button>
  )
}
