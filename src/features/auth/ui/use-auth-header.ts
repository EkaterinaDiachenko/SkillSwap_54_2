import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  logoutUser,
  selectCurrentUser,
  selectIsAuth,
} from '@/features/auth/model'
import { ROUTES } from '@/shared/lib/constants'
import { useAppDispatch, useAppSelector } from '@/store/hooks'

export function useAuthHeader() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(selectIsAuth)
  const currentUser = useAppSelector(selectCurrentUser)

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutUser()).unwrap()
      navigate(ROUTES.HOME, { replace: true })
    } catch {
      navigate(ROUTES.HOME, { replace: true })
    }
  }, [dispatch, navigate])

  return {
    isAuth,
    userName: currentUser?.name ?? '',
    avatarSrc: currentUser?.avatarUrl ?? undefined,
    onLogout: handleLogout,
  }
}
