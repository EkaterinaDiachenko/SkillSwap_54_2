import { HeaderNav } from '@/shared/ui/header-nav'
import styles from './footer-menu.module.css'

export type FooterMenuProps = {
  onOpenSkills?: () => void
  isSkillsOpen?: boolean
  className?: string
}

export function FooterMenu({ onOpenSkills, isSkillsOpen, className }: FooterMenuProps) {
  return (
    <nav
      className={[styles.menu, className].filter(Boolean).join(' ')}
      aria-label="Меню футера"
    >
      <HeaderNav
        variant="footer"
        onOpenSkills={onOpenSkills}
        isSkillsOpen={isSkillsOpen}
      />

      <ul className={styles.column}>
        <li>
          <a href="#" className={styles.link}>
            Контакты
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            Блог
          </a>
        </li>
      </ul>

      <ul className={styles.column}>
        <li>
          <a href="#" className={styles.link}>
            Политика конфиденциальности
          </a>
        </li>
        <li>
          <a href="#" className={styles.link}>
            Пользовательское соглашение
          </a>
        </li>
      </ul>

    </nav>
  )
}
