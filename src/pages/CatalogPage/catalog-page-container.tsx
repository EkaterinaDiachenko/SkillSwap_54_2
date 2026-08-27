import { generatePath, useNavigate } from 'react-router-dom'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { selectSkillsLoading, selectSkillsError } from '@/entities/skill/model'
import { selectUsersError, selectUsersLoading } from '@/entities/user/model'
import {
  selectAllCatalogCards,
  selectNewCards,
  selectPopularCards,
  selectRecommendedCards,
  useRecommendationsPagination,
} from '@/features/catalog/model'
import { ROUTES } from '@/shared/lib/constants'
import { useAppSelector } from '@/store/hooks'
import { CatalogPageUI, type CatalogPageProps } from './catalog-page'
type CatalogPageContainerProps = Pick<
  CatalogPageProps,
  | 'isAuth'
  | 'userName'
  | 'avatarSrc'
  | 'onLogin'
  | 'onRegister'
  | 'onProfileClick'
  | 'onFavoritesClick'
>

export default function CatalogPage({
  isAuth,
  userName,
  avatarSrc,
  onLogin,
  onRegister,
  onProfileClick,
  onFavoritesClick,
}: CatalogPageContainerProps) {
  const navigate = useNavigate()
  const allCards = useAppSelector(selectAllCatalogCards)
  const popularCards = useAppSelector(selectPopularCards)
  const newCards = useAppSelector(selectNewCards)
  const recommendationCards = useAppSelector(selectRecommendedCards)
  const { visibleCards, isLoadingMore, hasMore, loadMoreRef } =
    useRecommendationsPagination(recommendationCards)
  const usersLoading = useAppSelector(selectUsersLoading)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const usersError = useAppSelector(selectUsersError)
  const skillsError = useAppSelector(selectSkillsError)

  const handleCardDetailsClick = (skillId: string) => {
    navigate(generatePath(ROUTES.SKILL, { id: skillId }))
  }

  return (
    <CatalogPageUI
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogin={onLogin}
      onRegister={onRegister}
      onProfileClick={onProfileClick}
      onFavoritesClick={onFavoritesClick}
      categories={SKILL_CATEGORIES}
      selectedFilters={{}}
      onFilterChange={() => undefined}
      onReset={() => undefined}
      cities={[]}
      allCards={allCards}
      recommendationCards={visibleCards}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      loadMoreRef={loadMoreRef}
      popularCards={popularCards}
      newCards={newCards}
      isLoading={usersLoading || skillsLoading}
      loadError={usersError ?? skillsError}
      onShowPopular={() => undefined}
      onShowNew={() => undefined}
      onCardDetailsClick={handleCardDetailsClick}
    />
  )
}
