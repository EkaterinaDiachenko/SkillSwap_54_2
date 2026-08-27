import type { Location } from 'react-router-dom'
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { selectAuthLoading, selectCurrentUser, selectIsInitialized } from '@/features/auth/model'
import { ROUTES } from '@/shared/lib/constants'
import { Spinner } from '@/shared/ui/spinner'
import { useAppSelector } from '@/store/hooks'

export type PrivateRouteProps = {
  children: ReactNode
  onlyUnAuth?: boolean
}

type LocationState = {
  from?: Location
}

export function PrivateRoute({ children, onlyUnAuth = false }: PrivateRouteProps) {
  const location = useLocation()

  const currentUser = useAppSelector(selectCurrentUser)
  const isAuthChecked = useAppSelector(selectIsInitialized)
  const isLoading = useAppSelector(selectAuthLoading)

  if (!isAuthChecked || isLoading) {
    return <Spinner />
  }

  if (!onlyUnAuth && !currentUser) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  if (onlyUnAuth && currentUser) {
    const state = location.state as LocationState | null
    const from = state?.from

    return <Navigate to={from ?? ROUTES.HOME} replace />
  }

  return children
}
