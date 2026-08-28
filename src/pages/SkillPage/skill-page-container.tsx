import { useEffect } from 'react'
import { generatePath, useNavigate, useParams } from 'react-router-dom'
import { selectIsAuth, selectCurrentUser } from '@/features/auth/model'
import {
  selectSkillById,
  selectSkills,
  selectSkillsByAuthorId,
  selectSkillsLoading,
} from '@/entities/skill/model'
import { selectUserById, selectUsers, selectUsersLoading } from '@/entities/user/model'
import { SKILL_CATEGORIES } from '@/entities/skill'
import type { SkillTagData } from '@/entities/user/ui/skill-exchange-info'
import { ROUTES } from '@/shared/lib/constants'
import { Spinner } from '@/shared/ui/spinner'
import { useAppSelector } from '@/store/hooks'
import type { RelatedCard } from '@/widgets/related-cards'
import type { SkillCardProps } from '@/widgets/skill-card'
import type { SkillOwnerCardProps } from '@/widgets/skill-owner-card'
import type { SkillOfferProps } from '@/widgets/skill-offer'
import SkillPage, { type SkillPageProps } from './skill-page'

type SkillPageContainerProps = Pick<
  SkillPageProps,
  | 'onLogin'
  | 'onLogout'
  | 'onRegister'
  | 'onProfileClick'
  | 'onFavoritesClick'
  | 'onOfferClick'
  | 'isExchangeOffered'
>

function createSkillTag(
  skill: { title: string; categoryId: string },
): SkillTagData | null {
  const category = SKILL_CATEGORIES.find((item) => item.id === skill.categoryId)

  if (!category) {
    return null
  }

  return {
    title: skill.title,
    color: category.color,
  }
}

function createOwnerSkills(
  skills: Array<{ title: string; categoryId: string }>,
): SkillTagData[] {
  return skills.flatMap((skill) => {
    const tag = createSkillTag(skill)

    return tag ? [tag] : []
  })
}

function createCardData(
  skill: {
    id: string
    title: string
    categoryId: string
  },
  author: {
    name: string
    city: string
    age: number
    avatarUrl: string | null
    likesCount: number
  },
  learnSkills: Array<{ title: string; categoryId: string }>,
): SkillCardProps & { skillId: string } | null {
  const teachTag = createSkillTag(skill)

  if (!teachTag) {
    return null
  }

  return {
    skillId: skill.id,
    name: author.name,
    city: author.city,
    age: author.age,
    avatarUrl: author.avatarUrl,
    likesCount: author.likesCount,
    canTeach: [teachTag],
    wantsToLearn: createOwnerSkills(learnSkills),
  }
}

export default function SkillPageContainer({
  onLogin,
  onLogout,
  onRegister,
  onProfileClick,
  onFavoritesClick,
  onOfferClick,
  isExchangeOffered,
}: SkillPageContainerProps) {
  const { id } = useParams<{ id?: string }>()
  const navigate = useNavigate()

  const isAuth = useAppSelector(selectIsAuth)
  const currentUser = useAppSelector(selectCurrentUser)
  const skill = useAppSelector((state) => (id ? selectSkillById(state, id) : undefined))
  const author = useAppSelector((state) =>
    skill ? selectUserById(state, skill.authorId) : undefined,
  )
  const authorSkills = useAppSelector((state) =>
    author ? selectSkillsByAuthorId(state, author.id) : [],
  )
  const skills = useAppSelector(selectSkills)
  const users = useAppSelector(selectUsers)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const usersLoading = useAppSelector(selectUsersLoading)

  const isLoading = skillsLoading || usersLoading
  const isInvalidSkill =
    !id || !skill || skill.type !== 'teach' || !author

  useEffect(() => {
    if (!isLoading && isInvalidSkill) {
      navigate(ROUTES.ERROR_404, { replace: true })
    }
  }, [isInvalidSkill, isLoading, navigate])

  if (isLoading || isInvalidSkill) {
    return <Spinner />
  }

  const category = SKILL_CATEGORIES.find((item) => item.id === skill.categoryId)
  const subcategory = category?.subcategories.find(
    (item) => item.id === skill.subcategoryId,
  )

  const teachSkills = authorSkills.filter((item) => item.type === 'teach')
  const learnSkills = authorSkills.filter((item) => item.type === 'learn')

  const owner: SkillOwnerCardProps = {
    avatar: author.avatarUrl ?? '',
    name: author.name,
    city: author.city,
    age: author.age,
    about: author.about,
    canTeach: createOwnerSkills(teachSkills),
    wantsToLearn: createOwnerSkills(learnSkills),
  }

  const offer: Omit<SkillOfferProps, 'className'> = {
    title: skill.title,
    category: category?.title ?? '',
    subcategory: subcategory?.title ?? '',
    description: skill.description,
    images: skill.imageUrl,
    variant: 'primary',
    buttonText: 'Предложить обмен',
  }

  const relatedCards: RelatedCard[] = skills
    .filter(
      (candidate) =>
        candidate.type === 'teach' &&
        candidate.id !== skill.id &&
        candidate.categoryId === skill.categoryId,
    )
    .slice(0, 4)
    .flatMap((candidate) => {
      const candidateAuthor = users.find((user) => user.id === candidate.authorId)

      if (!candidateAuthor) {
        return []
      }

      const candidateLearnSkills = skills.filter(
        (authorSkill) =>
          authorSkill.authorId === candidateAuthor.id &&
          authorSkill.type === 'learn',
      )

      const card = createCardData(candidate, candidateAuthor, candidateLearnSkills)

      return card ? [card] : []
    })

  return (
    <SkillPage
      isAuth={isAuth}
      categories={SKILL_CATEGORIES}
      userName={currentUser?.name}
      avatarSrc={currentUser?.avatarUrl ?? undefined}
      owner={owner}
      offer={offer}
      relatedCards={relatedCards}
      onLogin={onLogin}
      onLogout={onLogout}
      onRegister={onRegister}
      onProfileClick={onProfileClick}
      onFavoritesClick={onFavoritesClick}
      onOfferClick={onOfferClick}
      onCardDetailsClick={(skillId) => {
        navigate(generatePath(ROUTES.SKILL, { id: skillId }))
      }}
      isExchangeOffered={isExchangeOffered}
    />
  )
}
