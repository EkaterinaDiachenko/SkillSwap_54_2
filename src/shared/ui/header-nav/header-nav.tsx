import { Icon } from '../icon'
import styles from './header-nav.module.css'

export type HeaderNavVariant = 'header' | 'footer'

export type HeaderNavProps = {
  /** Раскладка: header — шапка с шевроном; footer — колонка без шеврона (FooterMenu) */
  variant?: HeaderNavVariant
  /** Колбэк при клике на кнопку "Все навыки" (открытие меню) */
  onOpenSkills?: () => void
  /** Состояние открытости меню для анимации иконки */
  isSkillsOpen?: boolean
  className?: string
}

export function HeaderNav({
  variant = 'header',
  onOpenSkills,
  isSkillsOpen = false,
  className,
}: HeaderNavProps) {
  const isFooter = variant === 'footer'

  const handleSkillsClick = () => {
    onOpenSkills?.()
  }

  return (
    <nav
      className={[
        styles.nav,
        isFooter ? styles.navFooter : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={isFooter ? 'Ссылки футера: о проекте' : 'Основная навигация'}
      data-variant={variant}
    >
      <ul
        className={[styles.list, isFooter ? styles.listFooter : '']
          .filter(Boolean)
          .join(' ')}
      >
        <li>
          <a href="#" className={styles.link}>
            О проекте
          </a>
        </li>
        <li>
          {isFooter ? (
            <a href="#" className={styles.link}>
              Все навыки
            </a>
          ) : (
            <button
              type="button"
              className={styles.link}
              onClick={handleSkillsClick}
              aria-expanded={isSkillsOpen}
              aria-haspopup="true"
              data-open={isSkillsOpen}
            >
              <span>Все навыки</span>
              <Icon
                name="chevron-down"
                size={16}
                className={styles.chevron}
                aria-hidden="true"
              />
            </button>
          )}
        </li>
      </ul>
    </nav>
  )
}
