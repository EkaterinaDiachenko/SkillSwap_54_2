import { SKILL_CATEGORIES } from '@/entities/skill'
import {
  selectSkillsError,
  selectSkillsLoading,
} from '@/entities/skill/model'
import {
  selectUsersError,
  selectUsersLoading,
} from '@/entities/user/model'
import {
  selectAllCatalogCards,
  selectNewCards,
  selectPopularCards,
  selectRecommendedCards,
} from '@/features/catalog/model'
import { useAppSelector } from '@/store/hooks'
import { CatalogPageUI } from './catalog-page'

export default function CatalogPage() {
  const allCards = useAppSelector(selectAllCatalogCards)
  const popularCards = useAppSelector(selectPopularCards)
  const newCards = useAppSelector(selectNewCards)
  const recommendationCards = useAppSelector(selectRecommendedCards)
  const usersLoading = useAppSelector(selectUsersLoading)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const usersError = useAppSelector(selectUsersError)
  const skillsError = useAppSelector(selectSkillsError)

  return (
    <CatalogPageUI
      isAuth={false}
      categories={SKILL_CATEGORIES}
      selectedFilters={{}}
      onFilterChange={() => undefined}
      onReset={() => undefined}
      cities={[]}
      allCards={allCards}
      recommendationCards={recommendationCards}
      popularCards={popularCards}
      newCards={newCards}
      isLoading={usersLoading || skillsLoading}
      loadError={usersError ?? skillsError}
      onShowPopular={() => undefined}
      onShowNew={() => undefined}
    />
  )
}
