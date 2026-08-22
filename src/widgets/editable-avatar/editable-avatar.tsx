import clsx from 'clsx'
import { Avatar } from '@/shared/ui/avatar'
import { Icon } from '@/shared/ui/icon'
import styles from './editable-avatar.module.css'

export type EditableAvatarProps = {
  src?: string
  name?: string
  alt?: string
  className?: string
}

export function EditableAvatar({
  src,
  name,
  alt = 'Фото профиля',
  className,
}: EditableAvatarProps) {
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.avatarContainer}>
        <Avatar src={src} alt={alt} name={name} className={styles.avatar} />
        <button
          type="button"
          className={styles.editButton}
          aria-label="Изменить фото"
        >
          <Icon name="gallery-edit" size={24} aria-hidden />
        </button>
      </div>
    </div>
  )
}
