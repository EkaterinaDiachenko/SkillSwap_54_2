import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { City } from '@/shared/types'
import type { CatalogFilters, FilterMode, GenderFilter } from './types'
import { initialCatalogFilters } from './types'

interface ToggleCategoryPayload {
  categoryId: string
  subcategoryIds: string[]
}

interface ToggleSubcategoryPayload {
  categoryId: string
  subcategoryId: string
  subcategoryIds: string[]
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState: initialCatalogFilters,
  reducers: {
    setMode: (state, action: PayloadAction<FilterMode>) => {
      state.mode = action.payload
    },

    toggleCategory: (state, action: PayloadAction<ToggleCategoryPayload>) => {
      const { categoryId, subcategoryIds } = action.payload
      const categoryIndex = state.categoryIds.indexOf(categoryId)
      const subcategoryIdsToRemove = new Set(subcategoryIds)

      state.subcategoryIds = state.subcategoryIds.filter(
        (subcategoryId) => !subcategoryIdsToRemove.has(subcategoryId),
      )

      if (categoryIndex === -1) {
        state.categoryIds.push(categoryId)
      } else {
        state.categoryIds.splice(categoryIndex, 1)
      }

      state.categoryIds = [...new Set(state.categoryIds)]
      state.subcategoryIds = [...new Set(state.subcategoryIds)]
    },

    toggleSubcategory: (state, action: PayloadAction<ToggleSubcategoryPayload>) => {
      const { categoryId, subcategoryId, subcategoryIds } = action.payload
      const allSubcategoryIds = [...new Set(subcategoryIds)]
      const allSubcategoryIdsSet = new Set(allSubcategoryIds)
      const categoryIndex = state.categoryIds.indexOf(categoryId)
      const subcategoryIndex = state.subcategoryIds.indexOf(subcategoryId)

      if (categoryIndex !== -1) {
        state.categoryIds.splice(categoryIndex, 1)
        const subsToAdd = allSubcategoryIds.filter((id) => id !== subcategoryId)
        state.subcategoryIds = [...state.subcategoryIds, ...subsToAdd]
        return
      }

      if (subcategoryIndex === -1) {
        state.subcategoryIds.push(subcategoryId)
      } else {
        state.subcategoryIds.splice(subcategoryIndex, 1)
      }

      state.subcategoryIds = [...new Set(state.subcategoryIds)]

      const selectedSubcategoryIds = new Set(state.subcategoryIds)
      const categoryIsFullySelected =
        allSubcategoryIds.length > 0 &&
        allSubcategoryIds.every((id) => selectedSubcategoryIds.has(id))

      if (categoryIsFullySelected) {
        state.categoryIds.push(categoryId)
        state.categoryIds = [...new Set(state.categoryIds)]
        state.subcategoryIds = state.subcategoryIds.filter((id) => !allSubcategoryIdsSet.has(id))
      }
    },

    setGender: (state, action: PayloadAction<GenderFilter>) => {
      state.gender = action.payload
    },

    toggleCity: (state, action: PayloadAction<City>) => {
      const cityIndex = state.cities.indexOf(action.payload)

      if (cityIndex === -1) {
        state.cities.push(action.payload)
      } else {
        state.cities.splice(cityIndex, 1)
      }

      state.cities = [...new Set(state.cities)]
    },

    resetFilters: () => initialCatalogFilters,
  },
})

export const { setMode, toggleCategory, toggleSubcategory, setGender, toggleCity, resetFilters } =
  filtersSlice.actions

export type FiltersState = CatalogFilters
export default filtersSlice.reducer
