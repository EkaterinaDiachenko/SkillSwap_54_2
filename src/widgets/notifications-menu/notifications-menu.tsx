import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './notifications-menu.module.css'

/** Одно уведомление: тексты и дата приходят извне, без хардкода в компоненте */
export type NotificationItem = {
  id: string
  /** Основной текст, например «Николай принял ваш обмен» */
  title: string
  /** Дополнительный текст под заголовком */
  description: string
  /** Отформатированная дата: «сегодня», «вчера» или «23 мая» */
  date: string
}

export type NotificationsMenuProps = {
  /** true — меню видно под иконкой колокольчика */
  isOpen: boolean
  /** Новые (непросмотренные) уведомления */
  newNotifications: NotificationItem[]
  /** Просмотренные уведомления (без кнопки «Перейти») */
  viewedNotifications: NotificationItem[]
  /** Заглушка: переход к карточке предложения по кнопке «Перейти» */
  onNavigateToCard?: (id: string) => void
  /** Заглушка: «Прочитать все» в секции новых */
  onReadAll?: () => void
  /** Заглушка: «Очистить» в секции просмотренных */
  onClearViewed?: () => void
  className?: string
}

type NotificationRowProps = {
  notification: NotificationItem
  /** true — показываем «Перейти» (только для новых) */
  withNavigateButton?: boolean
  onNavigateToCard?: (id: string) => void
}

/**
 * Два ряда по макету:
 * 1 — [icon] [title + date / description]
 * 2 — [button] (слева на одной оси с иконкой)
 */
function NotificationRow({
  notification,
  withNavigateButton = false,
  onNavigateToCard,
}: NotificationRowProps) {
  return (
    <li className={styles.item}>
      <div className={styles.itemTop}>
        <Icon name="idea" size={40} className={styles.icon} />
        <p className={styles.title}>{notification.title}</p>
        <time className={styles.date} dateTime={notification.date}>
          {notification.date}
        </time>
        <p className={styles.description}>{notification.description}</p>
      </div>

      {withNavigateButton && (
        <Button
          type="button"
          variant="primary"
          className={styles.navigateButton}
          onClick={() => onNavigateToCard?.(notification.id)}
        >
          Перейти
        </Button>
      )}
    </li>
  )
}

/**
 * Выпадающее меню уведомлений.
 * Только разметка и отображение: без переноса новых в просмотренные и без закрытия по клику вне.
 */
export function NotificationsMenu({
  isOpen,
  newNotifications,
  viewedNotifications,
  onNavigateToCard,
  onReadAll,
  onClearViewed,
  className,
}: NotificationsMenuProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className={clsx(styles.menu, className)}
      aria-label="Уведомления"
    >
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Новые уведомления</h2>
          <Button
            type="button"
            variant="quaternary"
            className={styles.sectionAction}
            onClick={onReadAll}
          >
            Прочитать все
          </Button>
        </div>

        {newNotifications.length === 0 ? (
          <p className={styles.empty}>Новых уведомлений пока нет</p>
        ) : (
          <ul className={styles.list}>
            {newNotifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
                withNavigateButton
                onNavigateToCard={onNavigateToCard}
              />
            ))}
          </ul>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Просмотренные</h2>
          <Button
            type="button"
            variant="quaternary"
            className={styles.sectionAction}
            onClick={onClearViewed}
          >
            Очистить
          </Button>
        </div>

        {viewedNotifications.length === 0 ? (
          <p className={styles.empty}>Просмотренных уведомлений пока нет</p>
        ) : (
          <ul className={styles.list}>
            {viewedNotifications.map((notification) => (
              <NotificationRow
                key={notification.id}
                notification={notification}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
