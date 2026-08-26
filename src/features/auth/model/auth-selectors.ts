import type { User } from '@/shared/types'
import type { UsersRootState } from '@/entities/user/model'
import { selectUserById } from '@/entities/user/model'
import type { AuthState } from './auth-slice'

export type AuthRootState = {
  auth: AuthState
}

const selectAuthState = (state: AuthRootState): AuthState => state.auth

export const selectCurrentUser = (state: AuthRootState): AuthState['currentUser'] =>
  selectAuthState(state).currentUser

export const selectCurrentUserId = (state: AuthRootState): string | undefined =>
  selectAuthState(state).currentUser?.id

export const selectIsAuth = (state: AuthRootState): boolean =>
  selectAuthState(state).currentUser !== null

export const selectIsInitialized = (state: AuthRootState): boolean =>
  selectAuthState(state).isInitialized

export const selectAuthLoading = (state: AuthRootState): boolean =>
  selectAuthState(state).loading

export const selectAuthError = (state: AuthRootState): string | null =>
  selectAuthState(state).error

export const selectFullCurrentUser = (state: AuthRootState & UsersRootState): User | null => {
  const userId = selectCurrentUserId(state)
  if (!userId) return null
  return selectUserById(state, userId) ?? null
}
