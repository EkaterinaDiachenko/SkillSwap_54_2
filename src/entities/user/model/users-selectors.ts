import type { User } from '@/shared/types'
import type { UsersState } from './users-slice'

export type UsersRootState = {
  users: UsersState
}

const selectUsersState = (state: UsersRootState): UsersState => state.users

export const selectUsers = (state: UsersRootState): User[] => selectUsersState(state).users

export const selectUserById = (state: UsersRootState, id: string): User | undefined =>
  selectUsers(state).find((user) => user.id === id)

export const selectUsersLoading = (state: UsersRootState): boolean =>
  selectUsersState(state).loading

export const selectUsersError = (state: UsersRootState): string | null => selectUsersState(state).error
