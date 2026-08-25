// // skills-mega-menu.tsx - создать компонент SkillsMegaMenu (выпадающее меню) с JSX-разметкой,
// отображающий блок с категориями и подкатегориями навыков. Он состоит из секций с категориями (categories),
// слева от заголовков которых располагается цветной тег с вложенной иконкой Icon (содержимое Tag можно
//   передать через пропс content?). Можно использовать условный рендеринг или CSS-класс для отображения.
//   Управление пропсом isOpen будет в Header и Footer.
// // Важно: готовый компонент SkillsMegaMenu добавить в логику отображения компонентов в хедере и в
// футере, чтобы при клике на "Все навыки" появлялось выпадающее меню. Закрытие при клике вне меню
// не нужно реализовывать.
// // Из хедера — выпадающее меню открывается сверху.
// // Из футера — выпадающее меню открывается снизу.

// -categories (массив категорий навыков с вложенными подкатегориями)
// -isOpen (флаг, показывающий открыто меню или нет)
// -className?

import type { SkillCategory } from '@/entities/skill'
import { Icon } from '@/shared/ui/icon'
import { Tag } from '@/shared/ui/tag'
import styles from './skills-mega-menu.module.css'

export type SkillsMegaMenuProps = {
  categories: SkillCategory[]
  isOpen: boolean
  className?: string
}

export function SkillsMegaMenu({ categories, isOpen, className = '' }: SkillsMegaMenuProps) {
  if (!isOpen) return null
  return (
    <div className={`${styles.menu} ${className}`} aria-label="Категории навыков">
      {categories.map((category) => (
        <section className={styles.section} key={category.id}>
          <Tag
            content={<Icon name={category.icon} />}
            color={category.color}
            size="small"
            className={styles.iconTag}
          />

          <div className={styles.categoryContent}>
            <h3 className={styles.heading}>{category.title}</h3>

            <ul className={styles.subcategories}>
              {category.subcategories.map((subcategory) => (
                <li
                  className={styles.subcategory}
                  key={subcategory.id}
                >
                  {subcategory.title}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}