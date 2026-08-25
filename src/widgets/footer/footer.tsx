import { Logo } from '@/shared/ui/logo'
import { FooterMenu } from '@/shared/ui/footer-menu'
import styles from './footer.module.css'
import { useState } from 'react'
import { SkillsMegaMenu } from '@/widgets/skills-mega-menu'
import type { SkillCategory } from '@/entities/skill'

export type FooterProps = {
  categories: SkillCategory[]
  className?: string
}

/**
 * Виджет футера: Logo + копирайт слева, FooterMenu справа.
 * Размеры/отступы — см. footer.module.css (Figma: высота 232, поля 32/36, gap 60).
 * Копирайт: «SkillSwap — 2026» (в задаче 2026; на части кадров макета — 2025).
 * Ссылки меню — заглушки `#` (страницы Контакты/Блог/политика пока не делаем).
 */
export function Footer({ categories, className }: FooterProps) {
  const [isSkillsOpen, setIsSkillsOpen] = useState(false)
  return (
    <footer
      className={[styles.footer, className].filter(Boolean).join(' ')}
    >
      {/* Колонка как фильтры каталога: max-width 284, Logo сверху / копирайт снизу */}
      <div className={styles.brand}>
        <Logo />
        <p className={styles.copyright}>SkillSwap — 2026</p>
      </div>
      {/* На одной вертикали с колонкой карточек каталога (gap 60 от brand) */}
      <FooterMenu
        className={styles.menu}
        isSkillsOpen={isSkillsOpen}
        onOpenSkills={() => {
          setIsSkillsOpen((previousValue) => !previousValue)
        }}
      />
      <SkillsMegaMenu
        categories={categories}
        isOpen={isSkillsOpen}
        className={styles.skillsMegaMenu}
      />
    </footer>
  )
}
