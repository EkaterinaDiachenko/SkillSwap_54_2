import { createSelector } from '@reduxjs/toolkit'
import { selectSkills } from '@/entities/skill/model'
import { selectUsers } from '@/entities/user/model'
import type { SkillsRootState } from '@/entities/skill/model'
import type { UsersRootState } from '@/entities/user/model'

export type CatalogRootState = SkillsRootState & UsersRootState

export type CatalogCard = {
  skillId: string
  createdAt: string
  name: string
  city: string
  age: number
  avatarUrl: string | null
  likesCount: number
  canTeach: string[]
  wantsToLearn: string[]
}

function shuffleCards(cards: CatalogCard[]): CatalogCard[] {
  const shuffledCards = [...cards]

  for (let index = shuffledCards.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const currentCard = shuffledCards[index]
    shuffledCards[index] = shuffledCards[randomIndex]
    shuffledCards[randomIndex] = currentCard
  }

  return shuffledCards
}

export const selectAllCatalogCards = createSelector(
  [selectUsers, selectSkills],
  (users, skills): CatalogCard[] =>
    skills
      .filter((skill) => skill.type === 'teach')
      .flatMap((teachSkill) => {
        const author = users.find((user) => user.id === teachSkill.authorId)

        if (!author) {
          return []
        }

        const learnSkills = skills.filter(
          (skill) =>
            skill.authorId === author.id && skill.type === 'learn',
        )

        return [
          {
            skillId: teachSkill.id,
            createdAt: teachSkill.createdAt,
            name: author.name,
            city: author.city,
            age: author.age,
            avatarUrl: author.avatarUrl,
            likesCount: author.likesCount,
            canTeach: [teachSkill.title],
            wantsToLearn: learnSkills.map((skill) => skill.title),
          },
        ]
      }),
)

export const selectPopularCards = createSelector(
  [selectAllCatalogCards],
  (cards): CatalogCard[] =>
    [...cards]
      .sort((firstCard, secondCard) => secondCard.likesCount - firstCard.likesCount)
      .slice(0, 3),
)

export const selectNewCards = createSelector(
  [selectAllCatalogCards],
  (cards): CatalogCard[] =>
    [...cards]
      .sort(
        (firstCard, secondCard) =>
          new Date(secondCard.createdAt).getTime() -
          new Date(firstCard.createdAt).getTime(),
      )
      .slice(0, 3),
)

export const selectRecommendedCards = createSelector(
  [selectAllCatalogCards],
  (cards): CatalogCard[] => shuffleCards(cards),
)
