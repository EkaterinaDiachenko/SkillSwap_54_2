import clsx from 'clsx'
import { Icon, type IconName } from '@/shared/ui/icon'
import styles from './profile-sidebar.module.css'

export type ProfileSidebarItem = {
  label: string
  icon: IconName
  isActive?: boolean
}

export type ProfileSidebarProps = {
  items: ProfileSidebarItem[]
  className?: string
}

export function ProfileSidebar({ items, className }: ProfileSidebarProps) {
  return (
    <nav className={clsx(styles.sidebar, className)} aria-label="Профиль">
      <ul className={styles.list}>
        {items.map(({ label, icon, isActive }) => (
          <li key={label}>
            <button
              type="button"
              className={clsx(styles.item, isActive && styles.itemActive)}
            >
              <Icon name={icon} size={24} aria-hidden />
              <span className={styles.label}>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
