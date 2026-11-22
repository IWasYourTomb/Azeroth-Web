import { createI18n } from 'vue-i18n'

import ru from './locales/ru.json'
import en from './locales/en.json'

export type AppLocale = 'ru' | 'en'

const savedLocale = localStorage.getItem('azeroth-locale')

const locale: AppLocale =
  savedLocale === 'ru' || savedLocale === 'en'
    ? savedLocale
    : navigator.language.toLowerCase().startsWith('ru')
      ? 'ru'
      : 'en'

export const i18n = createI18n({
  legacy: false,
  locale,
  fallbackLocale: 'en',
  messages: {
    ru,
    en
  }
})