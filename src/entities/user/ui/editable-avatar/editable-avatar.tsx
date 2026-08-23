import clsx from 'clsx'
import { Avatar } from '@/shared/ui/avatar'
import { IconButton } from '@/shared/ui/icon-button'
import type { IconName } from '@/shared/ui/icon'
import styles from './editable-avatar.module.css'

export type EditableAvatarProps = {
  src?: string
  alt: string
  size?: number
  name?: string
  iconName: IconName
  onEdit?: () => void
  disabled?: boolean
  className?: string
}

export function EditableAvatar({
  src,
  alt,
  size = 244,
  name,
  iconName,
  onEdit,
  disabled = false,
  className,
}: EditableAvatarProps) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.container} style={{ width: size, height: size }}>
        <Avatar
          src={src}
          alt={alt}
          name={name}
          className={styles.avatar}
        />
        <IconButton
          iconName={iconName}
          aria-label="Изменить фото"
          onClick={onEdit}
          disabled={disabled}
          className={styles.editButton}
        />
      </div>
    </div>
  )
}
