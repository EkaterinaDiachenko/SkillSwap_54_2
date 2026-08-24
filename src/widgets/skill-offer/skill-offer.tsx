import { SkillDetails, type SkillDetailsProps } from '@/entities/skill/ui/skill-details'
import { SkillGallery } from '@/entities/skill/ui/skill-gallery'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './skill-offer.module.css'

/** Пропсы блока предложения навыка: детали слева + галерея справа */
export type SkillOfferProps = Omit<SkillDetailsProps, 'className'> & {
  /** Изображения навыка для галереи */
  images: string[]
  /** Активное изображение, с которого открывается галерея */
  activeImage?: string
  className?: string
}

/**
 * Блок предложения навыка: детали слева, галерея справа,
 * действия (избранное/поделиться/доп. действия) поверх карточки справа вверху.
 */
export function SkillOffer({
  title,
  category,
  subcategory,
  description,
  variant,
  buttonText,
  showDualButtons,
  images,
  activeImage,
  className,
}: SkillOfferProps) {
  return (
    <article className={[styles.offer, className].filter(Boolean).join(' ')}>
      <div className={styles.actions}>
        <IconButton iconName="like" aria-label="В избранное" className={styles.actionButton}/>
        <IconButton iconName="share" aria-label="Поделиться" className={styles.actionButton}/>
        <IconButton iconName="more-square" aria-label="Дополнительные действия" className={styles.actionButton}/>
      </div>

      <div className={styles.content}>
        <SkillDetails
          title={title}
          category={category}
          subcategory={subcategory}
          description={description}
          variant={variant}
          buttonText={buttonText}
          showDualButtons={showDualButtons}
          className={styles.details}
        />
        <SkillGallery images={images} activeImage={activeImage} className={styles.gallery} />
      </div>
    </article>
  )
}
