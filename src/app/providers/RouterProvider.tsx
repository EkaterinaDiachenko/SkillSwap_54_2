import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { ROUTES } from '@/shared/lib/constants'

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
const Error404Page = lazy(() =>
  import('@/pages/error-404').then(({ Error404 }) => ({ default: Error404 })),
)
const Error500Page = lazy(() =>
  import('@/pages/error-500').then(({ Error500 }) => ({ default: Error500 })),
)

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          <Route
            path={ROUTES.HOME}
            element={
              <CatalogPage
                isAuth={false}
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
            }
          />
          <Route path={ROUTES.SKILL} element={<SkillPage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<WelcomeRegisterPage />} />
          <Route path={ROUTES.REGISTER_STEP_2} element={<AboutRegisterPage />} />
          <Route path={ROUTES.REGISTER_STEP_3} element={<SkillRegisterPage />} />

          {/* Защищённые маршруты — добавь PrivateRoute обёртку */}
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.CREATE} element={<CreateSkillPage />} />

          <Route path={ROUTES.ERROR_404} element={<Error404Page isAuth={false} />} />
          <Route path={ROUTES.ERROR_500} element={<Error500Page isAuth={false} />} />
          <Route path="*" element={<Error404Page isAuth={false} />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
