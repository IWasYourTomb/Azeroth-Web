import { createI18n } from 'vue-i18n'

import ru from './locales/ru.json'
import en from './locales/en.json'

export type AppLocale = 'ru' | 'en'

const STORAGE_KEY = 'azeroth-locale'

function getInitialLocale(): AppLocale {
  const savedLocale = localStorage.getItem(STORAGE_KEY)

  if (savedLocale === 'ru' || savedLocale === 'en') {
    return savedLocale
  }

  const preferredLanguages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  return preferredLanguages.some(language =>
    language.toLowerCase().startsWith('ru')
  )
    ? 'ru'
    : 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    ru,
    en
  }
})