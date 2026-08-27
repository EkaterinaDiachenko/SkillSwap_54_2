import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef } from 'react'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { ROUTES } from '@/shared/lib/constants'
import { useAuthHeader } from '@/features/auth/ui/use-auth-header'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadUsers, selectUsersLoading } from '@/entities/user/model'
import { loadSkills, selectSkillsLoading } from '@/entities/skill/model'
import { checkUserAuth } from '@/features/auth/model'
import { loadRegistrationDraft } from '@/features/registration/model'
import { Spinner } from '@/shared/ui/spinner'

// Lazy-загрузка страниц — каждая страница грузится только при переходе на неё
const CatalogPage = lazy(() => import('@/pages/CatalogPage'))
const SkillPage = lazy(() => import('@/pages/SkillPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const FavoritesPage = lazy(() => import('@/pages/FavoritesPage'))
const CreateSkillPage = lazy(() => import('@/pages/CreateSkillPage'))
const LoginPage = lazy(() => import('@/pages/LoginPage'))
const WelcomeRegisterPage = lazy(() => import('@/pages/RegisterPages/WelcomeRegisterPage'))
const AboutRegisterPage = lazy(() => import('@/pages/RegisterPages/AboutRegisterPage'))
const SkillRegisterPage = lazy(() => import('@/pages/RegisterPages/SkillRegisterPage'))
const RegisterPreviewPage = lazy(() => import('@/pages/RegisterPages/RegisterPreviewPage'))
const OfferConfirmPage = lazy(() => import('@/pages/OfferConfirmPage'))
const Error404Page = lazy(() =>
  import('@/pages/error-404').then(({ Error404 }) => ({ default: Error404 })),
)
const Error500Page = lazy(() =>
  import('@/pages/error-500').then(({ Error500 }) => ({ default: Error500 })),
)

function SkillPageRoute() {
  const { isAuth, userName, avatarSrc, onLogout } = useAuthHeader()

  return (
    <SkillPage
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogout={onLogout}
      categories={SKILL_CATEGORIES}
    />
  )
}

function FavoritesPageRoute() {
  const navigate = useNavigate()
  const { userName, avatarSrc, onLogout } = useAuthHeader()

  return (
    <FavoritesPage
      userName={userName}
      avatarSrc={avatarSrc}
      onLogout={onLogout}
      onBackClick={() => navigate(ROUTES.HOME)}
    />
  )
}

function CatalogPageRoute() {
  const navigate = useNavigate()
  const { isAuth, userName, avatarSrc, onLogout } = useAuthHeader()

  return (
    <CatalogPage
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogout={onLogout}
      onLogin={() => navigate(ROUTES.LOGIN, { state: { from: ROUTES.HOME } })}
      onRegister={() => navigate(ROUTES.REGISTER, { state: { from: ROUTES.HOME } })}
      categories={SKILL_CATEGORIES}
      selectedFilters={{}}
      onFilterChange={() => undefined}
      onReset={() => undefined}
      cities={[]}
      recommendationCards={[]}
      popularCards={[]}
      newCards={[]}
      isLoading={false}
      onShowPopular={() => undefined}
      onShowNew={() => undefined}
    />
  )
}

function Error404PageRoute() {
  const { isAuth, userName, avatarSrc, onLogout } = useAuthHeader()

  return (
    <Error404Page
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogout={onLogout}
    />
  )
}

function Error500PageRoute() {
  const { isAuth, userName, avatarSrc, onLogout } = useAuthHeader()

  return (
    <Error500Page
      isAuth={isAuth}
      userName={userName}
      avatarSrc={avatarSrc}
      onLogout={onLogout}
    />
  )
}

export function AppRouter() {
  const dispatch = useAppDispatch()
  const hasLoaded = useRef(false)

  const usersLoading = useAppSelector(selectUsersLoading)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const isInitialLoading = usersLoading || skillsLoading

  useEffect(() => {
    if (hasLoaded.current) return
    hasLoaded.current = true

    dispatch(loadUsers())
    dispatch(loadSkills())
    dispatch(checkUserAuth())
    dispatch(loadRegistrationDraft())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        {isInitialLoading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route path={ROUTES.HOME} element={<CatalogPageRoute />} />
            <Route path={ROUTES.SKILL} element={<SkillPageRoute />} />
            <Route path={ROUTES.FAVORITES} element={<FavoritesPageRoute />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.REGISTER} element={<WelcomeRegisterPage />} />
            <Route path={ROUTES.REGISTER_STEP_2} element={<AboutRegisterPage />} />
            <Route path={ROUTES.REGISTER_STEP_3} element={<SkillRegisterPage />} />
            <Route path={ROUTES.REGISTER_PREVIEW} element={<RegisterPreviewPage />} />
            <Route path={ROUTES.OFFER_CONFIRM} element={<OfferConfirmPage />} />

            {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
            <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

            <Route path={ROUTES.ERROR_404} element={<Error404PageRoute />} />
            <Route path={ROUTES.ERROR_500} element={<Error500PageRoute />} />
            <Route path="*" element={<Error404PageRoute />} />
          </Routes>
        )}
      </Suspense>
    </BrowserRouter>
  )
}
