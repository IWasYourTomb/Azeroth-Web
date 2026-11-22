import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'

export type ThemeMode = 'dark' | 'light' | 'system'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref<ThemeMode>(
    (localStorage.getItem('azeroth-theme') as ThemeMode) || 'system'
  )

  const systemDark = ref(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  mediaQuery.addEventListener('change', event => {
    systemDark.value = event.matches
  })

  const resolvedTheme = computed(() => {
    if (theme.value === 'system') {
      return systemDark.value ? 'dark' : 'light'
    }

    return theme.value
  })

  function applyTheme() {
    document.documentElement.dataset.theme = resolvedTheme.value
    localStorage.setItem('azeroth-theme', theme.value)
  }

  function setTheme(value: ThemeMode) {
    theme.value = value
  }

  watch(resolvedTheme, applyTheme, { immediate: true })

  return {
    theme,
    resolvedTheme,
    setTheme
  }
})