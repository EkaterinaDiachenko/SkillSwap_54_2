import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { AuthUser } from '@/shared/types'
import { getUserApi, loginUserApi, logoutApi, type TLoginData } from '../api/auth-api'

export interface AuthState {
  currentUser: AuthUser | null
  isInitialized: boolean
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  currentUser: null,
  isInitialized: false,
  loading: false,
  error: null,
}

export const checkUserAuth = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
  'auth/checkUserAuth',
  async (_, { rejectWithValue }) => {
    try {
      return await getUserApi()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось проверить авторизацию',
      )
    }
  },
)

export const loginUser = createAsyncThunk<AuthUser, TLoginData, { rejectValue: string }>(
  'auth/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      return await loginUserApi(data)
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось выполнить вход',
      )
    }
  },
)

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi()
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : 'Не удалось выйти из аккаунта',
      )
    }
  },
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthUser>) => {
      state.currentUser = action.payload
      state.isInitialized = true
      state.error = null
    },
    clearAuthUser: (state) => {
      state.currentUser = null
      state.isInitialized = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.isInitialized = true
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false
        state.isInitialized = true
        state.currentUser = null
        state.error = null
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
        state.isInitialized = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось выполнить вход'
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false
        state.currentUser = null
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось выйти из аккаунта'
      })
  },
})

export const { setAuthUser, clearAuthUser } = authSlice.actions
export default authSlice.reducer
