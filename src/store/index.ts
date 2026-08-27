import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from '@/entities/user/model'
import { skillsReducer } from '@/entities/skill/model'
import { authReducer } from '@/features/auth/model'
import { registrationReducer } from '@/features/registration/model'
import { filtersReducer } from '@/features/catalog-filters/model'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    skills: skillsReducer,
    auth: authReducer,
    registration: registrationReducer,
    filters: filtersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
