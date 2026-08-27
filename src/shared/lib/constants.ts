export const ROUTES = {
  HOME: '/',
  SKILL: '/skill/:id',
  PROFILE: '/profile',
  FAVORITES: '/favorites',
  CREATE: '/create',
  LOGIN: '/login',
  REGISTER: '/register',
  REGISTER_STEP_2: '/register/2',
  REGISTER_STEP_3: '/register/3',
  REGISTER_PREVIEW: '/register/preview',
  OFFER_CONFIRM: '/offer-confirm',
  ERROR_404: '/404',
  ERROR_500: '/500',
} as const

export const LOCAL_STORAGE_KEYS = {
  AUTH_USER: 'skillswap_auth_user',
  FAVORITES: 'skillswap_favorites',
  REQUESTS: 'skillswap_requests',
  THEME: 'skillswap_theme',
  REGISTERED_USERS: 'skillswap_registered_users',
  REGISTERED_SKILLS: 'skillswap_registered_skills',
  AUTH_SESSION: 'skillswap_auth_session',
  REFRESH_TOKEN: 'skillswap_refresh_token',
  REGISTRATION_DRAFT: 'skillswap_registration_draft',
} as const

export const COOKIE_KEYS = {
  ACCESS_TOKEN: 'skillswap_access_token',
} as const
