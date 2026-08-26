import type { RegistrationState } from './registration-slice'
import type {
  RegistrationCredentials,
  RegistrationDraft,
  RegistrationLearningSkill,
  RegistrationOffer,
  RegistrationPersonalData,
  RegistrationStep,
} from './registration-types'

export type RegistrationRootState = {
  registration: RegistrationState
}

const selectRegistrationState = (state: RegistrationRootState): RegistrationState =>
  state.registration

export const selectRegistrationDraft = (state: RegistrationRootState): RegistrationDraft => {
  const { credentials, personalData, learningSkill, offer } = selectRegistrationState(state)

  return { credentials, personalData, learningSkill, offer }
}

export const selectCurrentStep = (state: RegistrationRootState): RegistrationStep =>
  selectRegistrationState(state).currentStep

export const selectCredentials = (state: RegistrationRootState): RegistrationCredentials =>
  selectRegistrationState(state).credentials

export const selectPersonalData = (state: RegistrationRootState): RegistrationPersonalData =>
  selectRegistrationState(state).personalData

export const selectLearningSkill = (state: RegistrationRootState): RegistrationLearningSkill =>
  selectRegistrationState(state).learningSkill

export const selectOffer = (state: RegistrationRootState): RegistrationOffer =>
  selectRegistrationState(state).offer

export const selectHasPreviousSteps = (state: RegistrationRootState) => {
  const { credentials, personalData, learningSkill } = selectRegistrationState(state)

  return {
    hasCredentials: Boolean(credentials.email && credentials.password),
    hasPersonalData: Boolean(
      personalData.name && personalData.birthDate && personalData.gender && personalData.city,
    ),
    hasLearningSkill: Boolean(learningSkill.category && learningSkill.subcategory),
  }
}

export const selectRegistrationLoading = (state: RegistrationRootState): boolean =>
  selectRegistrationState(state).loading

export const selectRegistrationError = (state: RegistrationRootState): string | null =>
  selectRegistrationState(state).error
