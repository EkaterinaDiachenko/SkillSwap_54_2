import { Icon } from '../icon'
import { Button } from '../button'
import styles from './header-nav.module.css'

export type HeaderNavVariant = 'header' | 'footer'

export type HeaderNavProps = {
  /** Раскладка: header — горизонтально; footer — колонка (FooterMenu) */
  variant?: HeaderNavVariant
  /**
   * Колбэк при клике на «Все навыки».
   * Мега-меню подключат позже (в футере панель сверху, в шапке — снизу).
   */
  onOpenSkills?: () => void
  /** Состояние открытости меню для анимации шеврона */
  isSkillsOpen?: boolean
  className?: string
}

/**
 * Навигация «О проекте» + «Все навыки» (стрелка).
 * В develop кнопка навыков — Button quaternary; variant footer — только раскладка.
 */
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
          {/* И в header, и в footer — quaternary + шеврон (ревью FooterMenu) */}
          <Button
            type="button"
            variant="quaternary"
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
          </Button>
        </li>
      </ul>
    </nav>
  )
}
