import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { Skill } from '@/shared/types'
import { getSkillsApi } from '../api/skills-api'

export interface SkillsState {
  skills: Skill[]
  loading: boolean
  error: string | null
}

const initialState: SkillsState = {
  skills: [],
  loading: false,
  error: null,
}

export const loadSkills = createAsyncThunk<Skill[], void, { rejectValue: string }>(
  'skills/loadSkills',
  async (_, { rejectWithValue }) => {
    try {
      return await getSkillsApi()
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Не удалось загрузить навыки')
    }
  },
)

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<Skill>) => {
      if (!state.skills.some((skill) => skill.id === action.payload.id)) {
        state.skills.push(action.payload)
      }
    },
    addSkills: (state, action: PayloadAction<Skill[]>) => {
      const skillsById = new Set(state.skills.map((skill) => skill.id))

      for (const skill of action.payload) {
        if (!skillsById.has(skill.id)) {
          state.skills.push(skill)
          skillsById.add(skill.id)
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSkills.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loadSkills.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.skills = action.payload
      })
      .addCase(loadSkills.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload ?? action.error.message ?? 'Не удалось загрузить навыки'
      })
  },
})

export const { addSkill, addSkills } = skillsSlice.actions
export default skillsSlice.reducer
