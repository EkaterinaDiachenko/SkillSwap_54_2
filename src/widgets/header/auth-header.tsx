import { useState } from 'react'
import { Logo } from '@/shared/ui/logo'
import { HeaderNav } from '@/shared/ui/header-nav'
import { SearchInput } from '@/shared/ui/search-input'
import { IconButton } from '@/shared/ui/icon-button'
import { UserMenu } from '@/shared/ui/user-menu'
import styles from './header.module.css'
import { SkillsMegaMenu } from '@/widgets/skills-mega-menu'
import type { SkillCategory } from '@/entities/skill'
import {
  NotificationsMenu,
  type NotificationItem,
} from '@/widgets/notifications-menu'

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
  /** Новые уведомления для NotificationsMenu */
  newNotifications?: NotificationItem[]
  /** Просмотренные уведомления для NotificationsMenu */
  viewedNotifications?: NotificationItem[]
  /** Заглушка: переход к карточке по «Перейти» */
  onNavigateToCard?: (id: string) => void
  /** Заглушка: «Прочитать все» */
  onReadAll?: () => void
  /** Заглушка: «Очистить» просмотренные */
  onClearViewed?: () => void
  className?: string
  categories: SkillCategory[]
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
  newNotifications = [],
  viewedNotifications = [],
  onNavigateToCard,
  onReadAll,
  onClearViewed,
  className,
  categories
}: AuthHeaderProps) {
  const [search, setSearch] = useState('')
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  // Открытие/закрытие меню уведомлений — только по клику на колокольчик
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  const hasNewNotifications = newNotifications.length > 0

  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
    >
      <div className={styles.left}>
        <Logo />
        <HeaderNav isSkillsOpen={isSkillsOpen}
          onOpenSkills={() => {
            setIsSkillsOpen((previousValue) => !previousValue)
          }} />
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

          {/* relative-обёртка: меню позиционируется под колокольчиком */}
          <div className={styles.notificationsWrapper}>
            <IconButton
              iconName={hasNewNotifications ? 'notification-new' : 'notification'}
              aria-label="Уведомления"
              aria-expanded={isNotificationsOpen}
              onClick={() => setIsNotificationsOpen((open) => !open)}
            />

            <NotificationsMenu
              isOpen={isNotificationsOpen}
              newNotifications={newNotifications}
              viewedNotifications={viewedNotifications}
              onNavigateToCard={onNavigateToCard}
              onReadAll={onReadAll}
              onClearViewed={onClearViewed}
              className={styles.notificationsMenu}
            />
          </div>

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
      <SkillsMegaMenu
        categories={categories}
        isOpen={isSkillsOpen}
        className={styles.skillsMegaMenu}
      />
    </header>
  )
}
