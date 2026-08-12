import { useState } from 'react'
import { Logo } from '@/shared/ui/logo'
import { HeaderNav } from '@/shared/ui/header-nav'
import { SearchInput } from '@/shared/ui/search-input'
import { IconButton } from '@/shared/ui/icon-button'
import { UserMenu } from '@/shared/ui/user-menu'
import styles from './header.module.css'

export type AuthHeaderProps = {
  /** Имя пользователя в UserMenu */
  name: string
  /** URL аватара; без src покажутся инициалы */
  avatarSrc?: string
  /** Клик по «Личный кабинет» в выпадающем меню */
  onProfileClick?: () => void
  /** Клик по «Выйти из аккаунта» */
  onLogout?: () => void
  /** Клик по иконке сердца (избранное) */
  onFavoritesClick?: () => void
  /** Клик по иконке колокольчика (уведомления) */
  onNotificationsClick?: () => void
  className?: string
}

/**
 * Шапка для авторизованного пользователя.
 * Совпадает с Header по структуре, но вместо кнопок входа — UserMenu и три иконки.
 */
export function AuthHeader({
  name,
  avatarSrc,
  onProfileClick,
  onLogout,
  onFavoritesClick,
  onNotificationsClick,
  className,
}: AuthHeaderProps) {
  const [search, setSearch] = useState('')

  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
    >
      <div className={styles.left}>
        <Logo />
        <HeaderNav />
      </div>

      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Искать навык"
        className={styles.search}
      />

      <div className={styles.right}>
        {/* Группа из трёх иконок: тема (заглушка), уведомления, избранное */}
        <div className={styles.iconGroup}>
          <IconButton iconName="moon" aria-label="Переключить тему" />
          <IconButton
            iconName="notification"
            aria-label="Уведомления"
            onClick={onNotificationsClick}
          />
          <IconButton
            iconName="like"
            aria-label="Избранное"
            onClick={onFavoritesClick}
          />
        </div>

        {/* Имя + аватар + выпадающее меню профиля */}
        <UserMenu
          name={name}
          avatarSrc={avatarSrc}
          onProfileClick={onProfileClick}
          onLogout={onLogout}
        />
      </div>
    </header>
  )
}
