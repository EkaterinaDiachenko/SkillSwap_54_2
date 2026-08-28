import { Header, AuthHeader } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { SkillOwnerCard, type SkillOwnerCardProps } from '@/widgets/skill-owner-card'
import { RelatedCards } from '@/widgets/related-cards'
import { SkillOffer, type SkillOfferProps } from '@/widgets/skill-offer'
import type { SkillCardProps } from '@/widgets/skill-card'
import type { SkillCategory } from '@/entities/skill'
import styles from './skill-page.module.css'
import gallery1 from './mocks/gallery-1.jpg'
import gallery2 from './mocks/gallery-2.jpg'
import gallery3 from './mocks/gallery-3.jpg'
import gallery4 from './mocks/gallery-4.jpg'
import gallery5 from './mocks/gallery-5.jpg'
import gallery6 from './mocks/gallery-6.jpg'
import gallery7 from './mocks/gallery-7.jpg'

export type SkillPageProps = {
  isAuth: boolean
  categories: SkillCategory[]
  userName?: string
  avatarSrc?: string
  onLogout?: () => void
  owner: SkillOwnerCardProps
  offer: Omit<SkillOfferProps, 'className'>
  relatedCards: SkillCardProps[]
  onLogin?: () => void
  onRegister?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onOfferClick?: () => void
  isExchangeOffered?: boolean
}

const DEFAULT_OWNER: SkillOwnerCardProps = {
  avatar: '',
  name: 'Иван',
  city: 'Санкт-Петербург',
  age: 34,
  about:
    'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое.',
  canTeach: [
    {
      title: 'Английский язык',
      color: 'languages',
    },
  ],
  wantsToLearn: [
    {
      title: 'Тайм менеджмент',
      color: 'business',
    },
    {
      title: 'Медитация',
      color: 'health',
    },
  ],
}

const DEFAULT_OFFER: Omit<SkillOfferProps, 'className'> = {
  title: 'Игра на барабанах',
  category: 'Творчество и искусство',
  subcategory: 'Музыка и звук',
  description:
    'Привет! Меня зовут Иван, и я уже более 10 лет играю на барабанах — от репетиций в гараже до выступлений на сцене. Готов делиться опытом и помочь освоить инструмент с нуля или подтянуть навыки.',
  variant: 'primary',
  buttonText: 'Предложить обмен',
  images: [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
  ],
}

const DEFAULT_RELATED: SkillCardProps[] = [
  {
    name: 'Илона',
    city: 'Екатеринбург',
    age: 33,
    likesCount: 0,
    canTeach: [
      {
        title: 'Английский язык',
        color: 'languages',
      },
    ],
    wantsToLearn: [
      {
        title: 'Тайм менеджмент',
        color: 'business',
      },
      {
        title: 'Медитация',
        color: 'health',
      },
      {
        title: 'Йога',
        color: 'health',
      },
      {
        title: 'Пилатес',
        color: 'health',
      },
    ],
  },
  {
    name: 'Михаил',
    city: 'Екатеринбург',
    age: 33,
    likesCount: 0,
    canTeach: [
      {
        title: 'Английский язык',
        color: 'languages',
      },
    ],
    wantsToLearn: [
      {
        title: 'Тайм менеджмент',
        color: 'business',
      },
      {
        title: 'Медитация',
        color: 'health',
      },
      {
        title: 'Йога',
        color: 'health',
      },
      {
        title: 'Пилатес',
        color: 'health',
      },
    ],
  },
  {
    name: 'Анна',
    city: 'Екатеринбург',
    age: 33,
    likesCount: 0,
    canTeach: [
      {
        title: 'Английский язык',
        color: 'languages',
      },
    ],
    wantsToLearn: [
      {
        title: 'Тайм менеджмент',
        color: 'business',
      },
      {
        title: 'Медитация',
        color: 'health',
      },
      {
        title: 'Йога',
        color: 'health',
      },
      {
        title: 'Пилатес',
        color: 'health',
      },
    ],
  },
  {
    name: 'Олег',
    city: 'Екатеринбург',
    age: 33,
    likesCount: 0,
    canTeach: [
      {
        title: 'Английский язык',
        color: 'languages',
      },
    ],
    wantsToLearn: [
      {
        title: 'Тайм менеджмент',
        color: 'business',
      },
      {
        title: 'Медитация',
        color: 'health',
      },
      {
        title: 'Йога',
        color: 'health',
      },
      {
        title: 'Пилатес',
        color: 'health',
      },
    ],
  },
  {
    name: 'Мария',
    city: 'Москва',
    age: 28,
    likesCount: 2,
    canTeach: [
      {
        title: 'Английский язык',
        color: 'languages',
      },
    ],
    wantsToLearn: [
      {
        title: 'Тайм менеджмент',
        color: 'business',
      },
      {
        title: 'Медитация',
        color: 'health',
      },
      {
        title: 'Йога',
        color: 'health',
      },
    ],
  },
]

/** Страница навыка — только композиция готовых блоков, без бизнес-логики. */
export default function SkillPage({
  isAuth = false,
  categories = [],
  userName = '',
  avatarSrc,
  onLogout,
  owner = DEFAULT_OWNER,
  offer = DEFAULT_OFFER,
  relatedCards = DEFAULT_RELATED,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  onOfferClick,
  isExchangeOffered = false,
}: Partial<SkillPageProps> = {}) {
  return (
    <div className={styles.page}>
      {isAuth ? (
        <AuthHeader
          name={userName}
          avatarSrc={avatarSrc}
          categories={categories}
          onLogout={onLogout}
          onProfileClick={onProfileClick}
          onFavoritesClick={onFavoritesClick}
        />
      ) : (
        <Header categories={categories} onLogin={onLogin} onRegister={onRegister} />
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

        <RelatedCards cards={relatedCards} />
      </main>

      <Footer categories={categories} />
    </div>
  )
}
