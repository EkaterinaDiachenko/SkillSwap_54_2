export {
  welcomeRegisterSchema,
  type WelcomeRegisterFormValues,
} from './welcome-register-page'

export {
  aboutRegisterSchema,
  type AboutRegisterFormValues,
} from './about-register-page'

export {
  skillRegisterSchema,
  type SkillRegisterFormValues,
} from './skill-register-page'

export {
  default as registrationReducer,
  updateCredentials,
  updatePersonalData,
  updateLearningSkill,
  updateOffer,
  setCurrentStep,
  restoreRegistrationDraft,
  resetRegistration,
  loadRegistrationDraft,
  registerUser,
} from './registration-slice'
export type { RegistrationState } from './registration-slice'
export type { RegistrationRootState } from './registration-selectors'
export {
  selectRegistrationDraft,
  selectCurrentStep,
  selectCredentials,
  selectPersonalData,
  selectLearningSkill,
  selectOffer,
  selectHasPreviousSteps,
  selectRegistrationLoading,
  selectRegistrationError,
} from './registration-selectors'
export type {
  RegistrationStep,
  RegistrationCredentials,
  RegistrationPersonalData,
  RegistrationLearningSkill,
  RegistrationOffer,
  RegistrationDraft,
  RegisterUserApiResult,
} from './registration-types'
export {
  getRegistrationDraft,
  saveRegistrationDraft,
  clearRegistrationDraft,
  registerUserApi,
} from '../api/registration-api'
