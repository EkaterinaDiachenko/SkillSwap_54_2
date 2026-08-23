import clsx from 'clsx'
import { NavLink } from 'react-router-dom'
import { Icon } from '@/shared/ui/icon'
import { ROUTES } from '@/shared/lib/constants'
import styles from './profile-sidebar.module.css'

export type ProfileSidebarProps = {
  className?: string
}

const menuItems = [
  { label: 'Заявки', icon: 'request' as const, to: '#' },
  { label: 'Мои обмены', icon: 'message-text' as const, to: '#' },
  { label: 'Избранное', icon: 'like' as const, to: ROUTES.FAVORITES },
  { label: 'Мои навыки', icon: 'idea' as const, to: '#' },
  { label: 'Личные данные', icon: 'user' as const, to: ROUTES.PROFILE },
]

export function ProfileSidebar({ className }: ProfileSidebarProps) {
  return (
    <nav className={clsx(styles.sidebar, className)} aria-label="Профиль">
      <ul className={styles.list}>
        {menuItems.map(({ label, icon, to }) => (
          <li key={label}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                clsx(styles.item, to !== '#' && isActive && styles.itemActive)
              }
              end={to === ROUTES.PROFILE}
            >
              <Icon name={icon} size={24} aria-hidden />
              <span className={styles.label}>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
