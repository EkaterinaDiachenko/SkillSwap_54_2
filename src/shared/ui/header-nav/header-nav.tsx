import { Icon } from '../icon'
import styles from './header-nav.module.css'

export type HeaderNavProps = {
  /** Колбэк при клике на кнопку "Все навыки" (открытие меню) */
  onOpenSkills?: () => void
  /** Состояние открытости меню для анимации иконки */
  isSkillsOpen?: boolean
}

export function HeaderNav({ 
  onOpenSkills, 
  isSkillsOpen = false 
}: HeaderNavProps) {
  const handleSkillsClick = () => {
    onOpenSkills?.()
  }

  return (
    <nav className={styles.nav} aria-label="Основная навигация">
      <ul className={styles.list}>
        <li>
          <a href="#" className={styles.link}>
            О проекте
          </a>
        </li>
        <li>
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
        </li>
      </ul>
    </nav>
  )
}