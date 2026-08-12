import { useState } from 'react'
import { Logo } from '@/shared/ui/logo'
import { HeaderNav } from '@/shared/ui/header-nav'
import { SearchInput } from '@/shared/ui/search-input'
import { IconButton } from '@/shared/ui/icon-button'
import { Button } from '@/shared/ui/button'
import styles from './header.module.css'

export type HeaderProps = {
  /** Колбэк при клике на «Войти» */
  onLogin?: () => void
  /** Колбэк при клике на «Зарегистрироваться» */
  onRegister?: () => void
  /** Колбэк при изменении текста в поле поиска */
  onChange?: (value: string) => void
  className?: string
}

/**
 * Шапка для неавторизованного пользователя (гостя).
 * Логотип + навигация + поиск + переключатель темы (заглушка) + кнопки входа.
 */
export function Header({
  onLogin,
  onRegister,
  onChange,
  className,
}: HeaderProps) {
  // SearchInput — контролируемый компонент, локальное состояние храним здесь
  const [search, setSearch] = useState('')

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onChange?.(value)
  }

  return (
    <header
      className={[styles.header, className].filter(Boolean).join(' ')}
    >
      {/* Левая группа: бренд и основная навигация */}
      <div className={styles.left}>
        <Logo />
        <HeaderNav />
      </div>

      {/* Центральная зона: поиск растягивается на доступную ширину */}
      <SearchInput
        value={search}
        onChange={handleSearchChange}
        placeholder="Искать навык"
        className={styles.search}
      />

      {/* Правая группа: иконки и кнопки авторизации */}
      <div className={styles.right}>
        {/* Заглушка переключателя темы — без onClick по макету */}
        <IconButton iconName="moon" aria-label="Переключить тему" />

        <div className={styles.actions}>
          {/* secondary — обводка, primary — заливка (см. макет) */}
          <Button variant="secondary" type="button" onClick={onLogin}>
            Войти
          </Button>
          <Button variant="primary" type="button" onClick={onRegister}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    </header>
  )
}
