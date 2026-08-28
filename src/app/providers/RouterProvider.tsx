import { Routes, Route, useLocation, type Location, useNavigate } from 'react-router-dom'
import { lazy, Suspense, useCallback, useEffect, useRef } from 'react'
import { SKILL_CATEGORIES } from '@/entities/skill'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { loadUsers, selectUsersLoading } from '@/entities/user/model'
import { loadSkills, selectSkillsLoading } from '@/entities/skill/model'
import {
  checkUserAuth,
  logoutUser,
  selectCurrentUser,
  selectIsAuth,
} from '@/features/auth/model'
import {
  loadRegistrationDraft,
  registerUser,
  selectOffer,
  selectRegistrationDraft,
  selectRegistrationError,
  selectRegistrationLoading,
} from '@/features/registration/model'
import { Spinner } from '@/shared/ui/spinner'
import { PrivateRoute } from '@/features/auth/private-route'
import { Modal } from '@/shared/ui/modal'
import { OfferConfirmContent } from '@/widgets/offer-confirm-content'
import { ExchangeOfferContent } from '@/widgets/exchange-offer-content'
import { RegisterPreviewContent } from '@/widgets/register-preview-content'

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

type RouterLocationState = {
  backgroundLocation?: Location
  from?: Location
  exchangeOffered?: boolean
}

function getLocationPath(locationValue: Location | undefined): string {
  if (!locationValue) {
    return ROUTES.HOME
  }

  return `${locationValue.pathname}${locationValue.search}${locationValue.hash}`
}

type RegisterPreviewModalProps = {
  onClose: () => void
  onEdit: () => void
}

function RegisterPreviewModal({ onClose, onEdit }: RegisterPreviewModalProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const offer = useAppSelector(selectOffer)
  const draft = useAppSelector(selectRegistrationDraft)
  const loading = useAppSelector(selectRegistrationLoading)
  const error = useAppSelector(selectRegistrationError)
  const state = location.state as RouterLocationState | null

  const selectedCategory = SKILL_CATEGORIES.find((category) => category.id === offer.category)
  const selectedSubcategory = selectedCategory?.subcategories.find(
    (subcategory) => subcategory.id === offer.subcategory,
  )

  const handleDone = async () => {
    try {
      await dispatch(registerUser(draft)).unwrap()

      navigate(ROUTES.OFFER_CONFIRM, {
        replace: true,
        state: {
          from: state?.from,
        },
      })
    } catch {
      // Ошибка отображается через selector
    }
  }

  return (
    <Modal isOpen onClose={onClose}>
      <RegisterPreviewContent
        title="Ваше предложение"
        subtitle="Проверьте данные перед завершением регистрации"
        skillTitle={offer.title}
        category={selectedCategory?.title ?? ''}
        subcategory={selectedSubcategory?.title ?? ''}
        description={offer.description}
        images={offer.imageUrls}
        onEditClick={onEdit}
        onDoneClick={loading ? undefined : handleDone}
      />
      {error ? (
        <p role="alert" style={{ marginTop: '16px', textAlign: 'center', color: 'var(--color-error)' }}>
          {error}
        </p>
      ) : null}
      {loading ? (
        <p style={{ marginTop: '8px', textAlign: 'center' }}>Завершение регистрации...</p>
      ) : null}
    </Modal>
  )
}

export function AppRouter() {
  const dispatch = useAppDispatch()
  const hasLoaded = useRef(false)
  const currentUser = useAppSelector(selectCurrentUser)
  const isAuth = useAppSelector(selectIsAuth)

  const usersLoading = useAppSelector(selectUsersLoading)
  const skillsLoading = useAppSelector(selectSkillsLoading)
  const isInitialLoading = usersLoading || skillsLoading
  const location = useLocation()
  const navigate = useNavigate()

  const state = location.state as RouterLocationState | null
  const backgroundLocation = state?.backgroundLocation

  const handleCloseModal = () => {
    navigate(-1)
  }

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap()
    } catch {
      // ignore
    }

    navigate(ROUTES.HOME, { replace: true })
  }, [dispatch, navigate])

  const handleExchangeOfferDone = () => {
    const background = state?.backgroundLocation

    if (!background) {
      navigate(ROUTES.HOME, { replace: true })
      return
    }

    navigate(`${background.pathname}${background.search}${background.hash}`, {
      replace: true,
      state: {
        ...(background.state ?? {}),
        exchangeOffered: true,
      },
    })
  }

  useEffect(() => {
    if (hasLoaded.current) return
    hasLoaded.current = true

    dispatch(loadUsers())
    dispatch(loadSkills())
    dispatch(checkUserAuth())
    dispatch(loadRegistrationDraft())
  }, [dispatch])

  const handlePreviewEdit = () => {
    navigate(ROUTES.REGISTER_STEP_3, {
      replace: true,
      state: {
        from: state?.from,
      },
    })
  }

  const handleLoginClick = () => {
    navigate(ROUTES.LOGIN, {
      state: {
        from: location,
      },
    })
  }

  const handleRegisterClick = () => {
    navigate(ROUTES.REGISTER, {
      state: {
        from: location,
      },
    })
  }

  const handleProfileClick = () => {
    navigate(ROUTES.PROFILE)
  }

  const handleFavoritesClick = () => {
    navigate(ROUTES.FAVORITES)
  }

  const handleOfferConfirmClose = () => {
    navigate(getLocationPath(state?.from), { replace: true })
  }

  const handleHomeClick = () => {
    navigate(ROUTES.HOME)
  }

  const handleOfferClick = () => {
    if (!isAuth) {
      navigate(ROUTES.LOGIN, {
        state: {
          from: location,
        },
      })
      return
    }

    navigate(ROUTES.EXCHANGE_OFFER, {
      state: {
        backgroundLocation: location,
      },
    })
  }

  const authHeaderProps = {
    userName: currentUser?.name,
    avatarSrc: currentUser?.avatarUrl ?? undefined,
    onLogout: handleLogout,
    onProfileClick: handleProfileClick,
    onFavoritesClick: handleFavoritesClick,
  }

  return (
    <Suspense fallback={<Spinner />}>
      {isInitialLoading ? (
        <Spinner />
      ) : (
        <Routes location={backgroundLocation ?? location}>
          <Route
            path={ROUTES.HOME}
            element={
              <CatalogPage
                isAuth={isAuth}
                userName={authHeaderProps.userName}
                avatarSrc={authHeaderProps.avatarSrc}
                onLogout={authHeaderProps.onLogout}
                onLogin={handleLoginClick}
                onRegister={handleRegisterClick}
                onProfileClick={handleProfileClick}
                onFavoritesClick={handleFavoritesClick}
              />
            }
          />
          <Route
            path={ROUTES.SKILL}
            element={
              <SkillPage
                onLogout={authHeaderProps.onLogout}
                onLogin={handleLoginClick}
                onRegister={handleRegisterClick}
                onProfileClick={handleProfileClick}
                onFavoritesClick={handleFavoritesClick}
                onOfferClick={handleOfferClick}
                isExchangeOffered={Boolean(state?.exchangeOffered)}
              />
            }
          />
          <Route
            path={ROUTES.FAVORITES}
            element={
              <PrivateRoute>
                <FavoritesPage
                  userName={authHeaderProps.userName}
                  avatarSrc={authHeaderProps.avatarSrc}
                  categories={SKILL_CATEGORIES}
                  onLogout={authHeaderProps.onLogout}
                  onProfileClick={handleProfileClick}
                  onFavoritesClick={handleFavoritesClick}
                  onBackClick={handleHomeClick}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <PrivateRoute onlyUnAuth>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER}
            element={
              <PrivateRoute onlyUnAuth>
                <WelcomeRegisterPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER_STEP_2}
            element={
              <PrivateRoute onlyUnAuth>
                <AboutRegisterPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER_STEP_3}
            element={
              <PrivateRoute onlyUnAuth>
                <SkillRegisterPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER_PREVIEW}
            element={
              <PrivateRoute onlyUnAuth>
                <RegisterPreviewModal onClose={handleCloseModal} onEdit={handlePreviewEdit} />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage
                  userName={authHeaderProps.userName}
                  avatarSrc={authHeaderProps.avatarSrc}
                  categories={SKILL_CATEGORIES}
                  onLogout={authHeaderProps.onLogout}
                  onProfileClick={handleProfileClick}
                  onFavoritesClick={handleFavoritesClick}
                />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.CREATE}
            element={
              <PrivateRoute>
                <CreateSkillPage />
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.OFFER_CONFIRM}
            element={
              <PrivateRoute>
                <Modal isOpen onClose={handleOfferConfirmClose}>
                  <OfferConfirmContent onButtonClick={handleOfferConfirmClose} />
                </Modal>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EXCHANGE_OFFER}
            element={
              <PrivateRoute>
                <Modal isOpen onClose={handleCloseModal}>
                  <ExchangeOfferContent onButtonClick={handleExchangeOfferDone} />
                </Modal>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.ERROR_404}
            element={
              <Error404Page
                isAuth={isAuth}
                categories={SKILL_CATEGORIES}
                userName={authHeaderProps.userName}
                avatarSrc={authHeaderProps.avatarSrc}
                onLogout={authHeaderProps.onLogout}
                onLogin={handleLoginClick}
                onRegister={handleRegisterClick}
                onProfileClick={handleProfileClick}
                onFavoritesClick={handleFavoritesClick}
                onHomeClick={handleHomeClick}
              />
            }
          />
          <Route
            path={ROUTES.ERROR_500}
            element={
              <Error500Page
                isAuth={isAuth}
                categories={SKILL_CATEGORIES}
                userName={authHeaderProps.userName}
                avatarSrc={authHeaderProps.avatarSrc}
                onLogout={authHeaderProps.onLogout}
                onLogin={handleLoginClick}
                onRegister={handleRegisterClick}
                onProfileClick={handleProfileClick}
                onFavoritesClick={handleFavoritesClick}
                onHomeClick={handleHomeClick}
              />
            }
          />
          <Route
            path="*"
            element={
              <Error404Page
                isAuth={isAuth}
                categories={SKILL_CATEGORIES}
                userName={authHeaderProps.userName}
                avatarSrc={authHeaderProps.avatarSrc}
                onLogout={authHeaderProps.onLogout}
                onLogin={handleLoginClick}
                onRegister={handleRegisterClick}
                onProfileClick={handleProfileClick}
                onFavoritesClick={handleFavoritesClick}
                onHomeClick={handleHomeClick}
              />
            }
          />
        </Routes>
      )}

      {backgroundLocation && (
        <Routes>
          <Route
            path={ROUTES.OFFER_CONFIRM}
            element={
              <PrivateRoute>
                <Modal isOpen onClose={handleOfferConfirmClose}>
                  <OfferConfirmContent onButtonClick={handleOfferConfirmClose} />
                </Modal>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.EXCHANGE_OFFER}
            element={
              <PrivateRoute>
                <Modal isOpen onClose={handleCloseModal}>
                  <ExchangeOfferContent onButtonClick={handleExchangeOfferDone} />
                </Modal>
              </PrivateRoute>
            }
          />
          <Route
            path={ROUTES.REGISTER_PREVIEW}
            element={
              <PrivateRoute onlyUnAuth>
                <RegisterPreviewModal onClose={handleCloseModal} onEdit={handlePreviewEdit} />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </Suspense>
  )
}
