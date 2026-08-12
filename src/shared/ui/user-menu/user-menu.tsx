import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@/shared/ui/avatar'
import { Icon } from '@/shared/ui/icon'
import styles from './user-menu.module.css'

export type UserMenuProps = {
  /** Имя пользователя в триггере и fallback для Avatar */
  name: string
  /** URL аватара; без src Avatar покажет инициалы из name */
  avatarSrc?: string
  /** Колбэк при клике на «Личный кабинет» */
  onProfileClick?: () => void
  /** Колбэк при клике на «Выйти из аккаунта» */
  onLogout?: () => void
  className?: string
}

/** Пример: <UserMenu name="Мария" avatarSrc="/avatars/avatar-01.png" onLogout={...} /> */
export function UserMenu({
  name,
  avatarSrc,
  onProfileClick,
  onLogout,
  className,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  // Контейнер для проверки клика снаружи меню
  const rootRef = useRef<HTMLDivElement>(null)

  // Закрытие по клику вне компонента (повторный клик по триггеру — в onClick)
  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isOpen])

  const handleProfileClick = () => {
    setIsOpen(false)
    onProfileClick?.()
  }

  const handleLogout = () => {
    setIsOpen(false)
    onLogout?.()
  }

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(' ')}
    >
      {/* Имя + аватар — единая кнопка открытия/закрытия меню */}
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.name}>{name}</span>
        <Avatar src={avatarSrc} alt={name} name={name} size="sm" />
      </button>

      {isOpen && (
        <div className={styles.menu} role="menu">
          <button
            type="button"
            className={styles.menuItem}
            role="menuitem"
            onClick={handleProfileClick}
          >
            Личный кабинет
          </button>

          <button
            type="button"
            className={styles.menuItemLogout}
            role="menuitem"
            onClick={handleLogout}
          >
            <span>Выйти из аккаунта</span>
            <Icon name="logout" size={24} />
          </button>
        </div>
      )}
    </div>
  )
}
