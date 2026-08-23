import clsx from 'clsx'
import { SkillDetails } from '@/entities/skill/ui/skill-details'
import { SkillGallery } from '@/entities/skill/ui/skill-gallery'
import styles from './register-preview-content.module.css'

export type RegisterPreviewContentProps = {
  /** Заголовок превью, например «Ваше предложение» */
  title: string
  /** Поясняющий текст под заголовком */
  subtitle: string
  /** Название навыка — передаётся в SkillDetails как title */
  skillTitle: string
  /** Категория навыка */
  category: string
  /** Подкатегория навыка */
  subcategory: string
  /** Описание предложения */
  description: string
  /** Колбэк при клике на «Редактировать» (пока заглушка у родителя) */
  onEditClick?: () => void
  /** Колбэк при клике на «Готово» (пока заглушка у родителя) */
  onDoneClick?: () => void
  /** URL изображений для галереи */
  images: string[]
  /** Активное изображение галереи при первом рендере */
  activeImage?: string
  className?: string
}

/**
 * Внутреннее содержимое модального превью предложения после регистрации.
 * Не содержит Modal/overlay — передаётся через children в готовый Modal.
 */
export function RegisterPreviewContent({
  title,
  subtitle,
  skillTitle,
  category,
  subcategory,
  description,
  onEditClick,
  onDoneClick,
  images,
  activeImage,
  className,
}: RegisterPreviewContentProps) {
  return (
    <div className={clsx(styles.container, className)}>
      {/* Шапка превью: заголовок и пояснение по центру, как в макете */}
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      {/* Две колонки: текст слева, галерея справа */}
      <div className={styles.content}>
        <SkillDetails
          title={skillTitle}
          category={category}
          subcategory={subcategory}
          description={description}
          showDualButtons
          onEditClick={onEditClick}
          onDoneClick={onDoneClick}
          className={styles.details}
        />

        <SkillGallery
          images={images}
          activeImage={activeImage}
          className={styles.gallery}
        />
      </div>
    </div>
  )
}
