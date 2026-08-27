import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { SkillOwnerCard, type SkillOwnerCardProps } from '@/widgets/skill-owner-card'
import { RelatedCards, type RelatedCard } from '@/widgets/related-cards'
import { SkillOffer, type SkillOfferProps } from '@/widgets/skill-offer'
import type { SkillCategory } from '@/entities/skill'
import styles from './skill-page.module.css'

export type SkillPageProps = {
  isAuth: boolean
  categories: SkillCategory[]
  userName?: string
  avatarSrc?: string
  owner: SkillOwnerCardProps
  offer: Omit<SkillOfferProps, 'className'>
  relatedCards: RelatedCard[]
  onLogin?: () => void
  onRegister?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onOfferClick?: () => void
  onCardDetailsClick: (skillId: string) => void
  isExchangeOffered?: boolean
}

/** Страница навыка — только композиция готовых блоков, без бизнес-логики. */
export default function SkillPage({
  isAuth,
  categories,
  userName,
  avatarSrc,
  owner,
  offer,
  relatedCards,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  onOfferClick,
  onCardDetailsClick,
  isExchangeOffered = false,
}: SkillPageProps) {
  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName ?? ''}
          avatarSrc={avatarSrc}
          categories={categories}
          onProfileClick={onProfileClick}
          onFavoritesClick={onFavoritesClick}
        />
      ) : (
        <Header
          categories={categories}
          onLogin={onLogin}
          onRegister={onRegister}
        />
      )}

      <main className={styles.main}>
        <div className={styles.hero}>
          <SkillOwnerCard {...owner} className={styles.owner} />
          <SkillOffer
            {...offer}
            variant={isExchangeOffered ? 'secondary' : offer.variant}
            buttonText={isExchangeOffered ? 'Обмен предложен' : offer.buttonText}
            className={styles.offer}
            onButtonClick={isExchangeOffered ? undefined : onOfferClick}
          />
        </div>

        <RelatedCards
          cards={relatedCards}
          onCardDetailsClick={onCardDetailsClick}
        />
      </main>

      <Footer categories={categories} />
    </div>
  )
}
