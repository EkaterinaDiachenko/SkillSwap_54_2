import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/shared/types'
import { getUsersApi } from '../api/users-api'

export interface UsersState {
  users: User[]
  loading: boolean
  error: string | null
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
}

export const loadUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  'users/loadUsers',
  async (_, { rejectWithValue }) => {
    try {
      return await getUsersApi()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось загрузить пользователей',
      )
    }
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      if (!state.users.some((user) => user.id === action.payload.id)) {
        state.users.push(action.payload)
      }
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id)

      if (userIndex !== -1) {
        state.users[userIndex] = action.payload
      }
    },
    toggleFavoriteSkill: (
      state,
      action: PayloadAction<{ userId: string; skillId: string }>,
    ) => {
      const user = state.users.find((item) => item.id === action.payload.userId)

      if (!user) {
        return
      }

      const skillIndex = user.favoriteSkillIds.indexOf(action.payload.skillId)

      if (skillIndex === -1) {
        user.favoriteSkillIds.push(action.payload.skillId)
      } else {
        user.favoriteSkillIds.splice(skillIndex, 1)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadUsers.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.users = action.payload
      })
      .addCase(loadUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить пользователей'
      })
  },
})

export const { addUser, updateUser, toggleFavoriteSkill } = usersSlice.actions
export default usersSlice.reducer
