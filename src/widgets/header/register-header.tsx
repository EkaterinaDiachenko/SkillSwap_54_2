import { Logo } from '@/shared/ui/logo'
import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'
import styles from './header.module.css'

export type RegisterHeaderProps = {
  /** Колбэк при клике на «Закрыть» */
  onClose?: () => void
  className?: string
}

/**
 * Минимальная шапка для страниц регистрации.
 * Светлый фон, логотип слева и кнопка «Закрыть» с крестиком справа.
 */
export function RegisterHeader({ onClose, className }: RegisterHeaderProps) {
  return (
    <header className={[styles.registerHeader, className].filter(Boolean).join(' ')}>
      <Logo />

      {/* tertiary — белая кнопка с обводкой по макету */}
      <Button type="button" variant="tertiary" className={styles.closeButton} onClick={onClose}>
        Закрыть
        <Icon name="cross" size={24} aria-hidden="true" />
      </Button>
    </header>
  )
}
