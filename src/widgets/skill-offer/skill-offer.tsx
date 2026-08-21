import {
  SkillDetails,
  type SkillDetailsProps,
} from '@/entities/skill/ui/skill-details'
import { SkillGallery } from '@/entities/skill/ui/skill-gallery'
import { IconButton } from '@/shared/ui/icon-button'
import styles from './skill-offer.module.css'

export type SkillOfferProps = Omit<SkillDetailsProps, 'className'> & {
  images: string[]
  className?: string
}

/**
 * Большой блок предложения на странице навыка:
 * SkillDetails + SkillGallery + три IconButton по макету.
 * Share и «ещё» — заглушки, обработчики кликов не вешаем.
 */
export function SkillOffer({
  images,
  className,
  ...details
}: SkillOfferProps) {
  return (
    <article className={[styles.card, className].filter(Boolean).join(' ')}>
      <SkillDetails {...details} />
      <SkillGallery images={images} />
      <div className={styles.actions}>
        <IconButton iconName="like" aria-label="Добавить в избранное" />
        <IconButton iconName="share" aria-label="Поделиться" />
        <IconButton
          iconName="more-square"
          aria-label="Дополнительные действия"
        />
      </div>
    </article>
  )
}
