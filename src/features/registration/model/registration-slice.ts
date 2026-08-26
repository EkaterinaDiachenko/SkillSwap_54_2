import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { addSkills } from '@/entities/skill/model'
import { addUser } from '@/entities/user/model'
import { setAuthUser } from '@/features/auth/model'
import {
  getRegistrationDraft,
  registerUserApi,
} from '../api/registration-api'
import type {
  RegisterUserApiResult,
  RegistrationCredentials,
  RegistrationDraft,
  RegistrationLearningSkill,
  RegistrationOffer,
  RegistrationPersonalData,
  RegistrationStep,
} from './registration-types'

export interface RegistrationState {
  currentStep: RegistrationStep
  credentials: RegistrationCredentials
  personalData: RegistrationPersonalData
  learningSkill: RegistrationLearningSkill
  offer: RegistrationOffer
  loading: boolean
  error: string | null
}

const initialState: RegistrationState = {
  currentStep: 1,
  credentials: {
    email: '',
    password: '',
  },
  personalData: {
    name: '',
    birthDate: '',
    gender: '',
    city: '',
    avatarUrl: null,
  },
  learningSkill: {
    category: '',
    subcategory: '',
  },
  offer: {
    title: '',
    category: '',
    subcategory: '',
    description: '',
    imageUrls: [],
  },
  loading: false,
  error: null,
}

export const loadRegistrationDraft = createAsyncThunk<
  RegistrationDraft | null,
  void,
  { rejectValue: string }
>('registration/loadRegistrationDraft', async (_, { rejectWithValue }) => {
  try {
    return getRegistrationDraft()
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось загрузить черновик регистрации',
    )
  }
})

export const registerUser = createAsyncThunk<
  RegisterUserApiResult,
  RegistrationDraft,
  { rejectValue: string }
>('registration/registerUser', async (draft, { dispatch, rejectWithValue }) => {
  try {
    const result = await registerUserApi(draft)

    dispatch(addUser(result.user))
    dispatch(addSkills(result.skills))
    dispatch(setAuthUser(result.authUser))

    return result
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : 'Не удалось завершить регистрацию',
    )
  }
})

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    updateCredentials: (state, action: PayloadAction<Partial<RegistrationCredentials>>) => {
      state.credentials = { ...state.credentials, ...action.payload }
      state.error = null
    },
    updatePersonalData: (state, action: PayloadAction<Partial<RegistrationPersonalData>>) => {
      state.personalData = { ...state.personalData, ...action.payload }
      state.error = null
    },
    updateLearningSkill: (state, action: PayloadAction<Partial<RegistrationLearningSkill>>) => {
      state.learningSkill = { ...state.learningSkill, ...action.payload }
      state.error = null
    },
    updateOffer: (state, action: PayloadAction<Partial<RegistrationOffer>>) => {
      state.offer = { ...state.offer, ...action.payload }
      state.error = null
    },
    setCurrentStep: (state, action: PayloadAction<RegistrationStep>) => {
      state.currentStep = action.payload
    },
    restoreRegistrationDraft: (state, action: PayloadAction<RegistrationDraft>) => {
      state.credentials = action.payload.credentials
      state.personalData = action.payload.personalData
      state.learningSkill = action.payload.learningSkill
      state.offer = action.payload.offer
      state.error = null
    },
    resetRegistration: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadRegistrationDraft.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadRegistrationDraft.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload) {
          state.credentials = action.payload.credentials
          state.personalData = action.payload.personalData
          state.learningSkill = action.payload.learningSkill
          state.offer = action.payload.offer
        }
      })
      .addCase(loadRegistrationDraft.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить черновик регистрации'
      })

      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, () => initialState)
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось завершить регистрацию'
      })
  },
})

export const {
  updateCredentials,
  updatePersonalData,
  updateLearningSkill,
  updateOffer,
  setCurrentStep,
  restoreRegistrationDraft,
  resetRegistration,
} = registrationSlice.actions

export default registrationSlice.reducer
