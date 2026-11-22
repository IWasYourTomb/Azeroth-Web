<template>
  <!-- =========================================
       HEADER
  ========================================== -->
  <header
    ref="headerRef"
    class="app-header"
  >
    <div class="header-container">
  <!-- BRAND -->
  <RouterLink
    to="/"
    class="brand"
    @click="closeAll"
  >
    <div class="brand-emblem">
      <span>A</span>
    </div>

    <div class="brand-name">
      <span>AZEROTH</span>
      <small>LAUNCHER</small>
    </div>
  </RouterLink>


  <!-- HEADER ACTIONS -->
  <div class="header-actions">

    <!-- LANGUAGE -->
    <div class="header-dropdown">
      <button
        type="button"
        class="header-control"
        :class="{
          'is-open': activeDropdown === 'language'
        }"
        aria-label="Change language"
        aria-haspopup="true"
        :aria-expanded="activeDropdown === 'language'"
        @click="toggleDropdown('language')"
      >
        <Globe :size="16" />

        <span>{{ currentLanguage }}</span>

        <ChevronDown
          :size="13"
          class="dropdown-chevron"
        />
      </button>

      <Transition name="dropdown">
        <div
          v-if="activeDropdown === 'language'"
          class="header-dropdown__menu"
        >
          <button
            v-for="language in languages"
            :key="language.code"
            type="button"
            :class="{
              active: locale === language.code
            }"
            @click="changeLanguage(language.code)"
          >
            <span class="dropdown-option__label">
              {{ language.label }}
            </span>

            <Check
              v-if="locale === language.code"
              :size="15"
            />
          </button>
        </div>
      </Transition>
    </div>


    <!-- THEME -->
    <div class="header-dropdown">
      <button
        type="button"
        class="header-control header-control--theme"
        :class="{
          'is-open': activeDropdown === 'theme'
        }"
        aria-label="Change theme"
        aria-haspopup="true"
        :aria-expanded="activeDropdown === 'theme'"
        @click="toggleDropdown('theme')"
      >
        <Sun
          v-if="themeStore.theme === 'light'"
          :size="16"
        />

        <Moon
          v-else-if="themeStore.theme === 'dark'"
          :size="16"
        />

        <Monitor
          v-else
          :size="16"
        />

        <span>{{ currentThemeLabel }}</span>

        <ChevronDown
          :size="13"
          class="dropdown-chevron"
        />
      </button>

      <Transition name="dropdown">
        <div
          v-if="activeDropdown === 'theme'"
          class="header-dropdown__menu header-dropdown__menu--theme"
        >
          <button
            v-for="item in themes"
            :key="item.value"
            type="button"
            :class="{
              active: themeStore.theme === item.value
            }"
            @click="changeTheme(item.value)"
          >
            <component
              :is="item.icon"
              :size="16"
            />

            <span class="dropdown-option__label">
              {{ t(item.label) }}
            </span>

            <Check
              v-if="themeStore.theme === item.value"
              :size="15"
            />
          </button>
        </div>
      </Transition>
    </div>


    <!-- DOWNLOAD -->
    <a
      href="#download"
      class="header-download"
      @click.prevent="navigateTo('download')"
    >
      <Download :size="15" />

      <span>
        {{ t('navigation.download') }}
      </span>

      <ArrowUpRight :size="13" />
    </a>


    <!-- MOBILE MENU TOGGLE -->
    <button
      type="button"
      class="mobile-menu-toggle"
      :class="{
        'is-open': isMobileMenuOpen
      }"
      :aria-expanded="isMobileMenuOpen"
      aria-controls="mobile-navigation"
      :aria-label="
        isMobileMenuOpen
          ? 'Close menu'
          : 'Open menu'
      "
      @click="toggleMobileMenu"
    >
      <X
        v-if="isMobileMenuOpen"
        :size="21"
      />

      <Menu
        v-else
        :size="21"
      />
    </button>

  </div>
</div>


<!-- =========================================
     MOBILE NAVIGATION
========================================== -->

<Transition name="mobile-navigation">
  <div
    v-if="isMobileMenuOpen"
    id="mobile-navigation"
    class="mobile-navigation"
  >

    <!-- LINKS -->
    <nav
      class="mobile-navigation__links"
      aria-label="Mobile navigation"
    >
      <a
        v-for="(item, index) in navigation"
        :key="item.id"
        :href="`#${item.id}`"
        :class="{
          active: activeSection === item.id
        }"
        :aria-current="
          activeSection === item.id
            ? 'location'
            : undefined
        "
        @click.prevent="navigateTo(item.id)"
      >
        <span class="mobile-navigation__index">
          {{ String(index + 1).padStart(2, '0') }}
        </span>

        <span>
          {{ t(item.label) }}
        </span>

        <ArrowUpRight :size="16" />
      </a>
    </nav>


    <div class="mobile-navigation__divider"></div>


    <!-- MOBILE LANGUAGE -->
    <div class="mobile-setting">
      <div class="mobile-setting__heading">
        <Globe :size="16" />

        <span>
          {{ locale === 'ru' ? 'Язык' : 'Language' }}
        </span>
      </div>

      <div class="mobile-setting__options">
        <button
          v-for="language in languages"
          :key="language.code"
          type="button"
          :class="{
            active: locale === language.code
          }"
          @click="changeLanguage(language.code)"
        >
          {{ language.code.toUpperCase() }}
        </button>
      </div>
    </div>


    <!-- MOBILE THEME -->
    <div class="mobile-setting">
      <div class="mobile-setting__heading">
        <Sun :size="16" />

        <span>
          {{ t('theme.title') }}
        </span>
      </div>

      <div class="mobile-setting__options">
        <button
          v-for="item in themes"
          :key="item.value"
          type="button"
          :class="{
            active: themeStore.theme === item.value
          }"
          @click="changeTheme(item.value)"
        >
          <component
            :is="item.icon"
            :size="14"
          />

          {{ t(item.label) }}
        </button>
      </div>
    </div>


    <!-- MOBILE FOOTER -->
    <div class="mobile-navigation__footer">
      <span>AZEROTH LAUNCHER</span>
      <span>WORLD OF WARCRAFT ON MAC</span>
    </div>

  </div>
</Transition>
  </header>
  <nav
    class="desktop-navigation"
    aria-label="Main navigation"
  >
    <a
      v-for="item in desktopNavigation"
      :key="item.id"
      :href="`#${item.id}`"
      :class="{
        active: activeSection === item.id
      }"
      :aria-current="
        activeSection === item.id
          ? 'location'
          : undefined
      "
      @click.prevent="navigateTo(item.id)"
    >
      {{ t(item.label) }}
    </a>
  </nav>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  onUnmounted,
  ref,
  watch
} from 'vue'

import { useI18n } from 'vue-i18n'

import {
  useThemeStore,
  type ThemeMode
} from '../../stores/theme'

import {
  Sun,
  Moon,
  Monitor,
  Globe,
  Download,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  Check
} from 'lucide-vue-next'


/* =========================================
   STORES
========================================= */

const { t, locale } = useI18n()

const themeStore = useThemeStore()


/* =========================================
   STATE
========================================= */

const headerRef = ref<HTMLElement | null>(null)

const isMobileMenuOpen = ref(false)

const activeDropdown = ref<'language' | 'theme' | null>(null)

const activeSection = ref('home')


/* =========================================
   CONFIGURATION
========================================= */

const languages = [
  {
    code: 'en',
    label: 'English'
  },
  {
    code: 'ru',
    label: 'Русский'
  }
]

const themes = [
  {
    value: 'dark' as ThemeMode,
    label: 'theme.dark',
    icon: Moon
  },
  {
    value: 'light' as ThemeMode,
    label: 'theme.light',
    icon: Sun
  },
  {
    value: 'system' as ThemeMode,
    label: 'theme.system',
    icon: Monitor
  }
]

const navigation = [
  {
    id: 'home',
    label: 'navigation.home'
  },
  {
    id: 'expansions',
    label: 'navigation.expansions'
  },
  {
    id: 'features',
    label: 'navigation.features'
  },
  {
    id: 'how-it-works',
    label: 'navigation.howItWorks'
  },
  {
    id: 'screenshots',
    label: 'navigation.screenshots'
  },
  {
    id: 'compatibility',
    label: 'navigation.compatibility'
  },
  {
    id: 'release-notes',
    label: 'navigation.releaseNotes'
  },
  {
    id: 'download',
    label: 'navigation.download'
  },

]

const desktopNavigation = computed(() => {
  return navigation.filter(
    item => item.id !== 'download'
  )
})


/* =========================================
   COMPUTED
========================================= */

const currentLanguage = computed(() => {
  return locale.value.toUpperCase()
})

const currentThemeLabel = computed(() => {
  const theme = themes.find(
    item => item.value === themeStore.theme
  )

  return theme ? t(theme.label) : ''
})


/* =========================================
   LANGUAGE
========================================= */

function changeLanguage(language: string) {
  if (locale.value === language) {
    activeDropdown.value = null
    return
  }

  locale.value = language

  localStorage.setItem(
    'azeroth-locale',
    language
  )

  activeDropdown.value = null
}


/* =========================================
   THEME
========================================= */

function changeTheme(theme: ThemeMode) {
  themeStore.setTheme(theme)

  activeDropdown.value = null
}


/* =========================================
   DROPDOWNS
========================================= */

function toggleDropdown(
  name: 'language' | 'theme'
) {
  activeDropdown.value =
    activeDropdown.value === name
      ? null
      : name
}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value

  activeDropdown.value = null
}

function closeAll() {
  isMobileMenuOpen.value = false
  activeDropdown.value = null
}


/* =========================================
   SECTION NAVIGATION
========================================= */

function getSectionOffset(section: HTMLElement) {
  const headerHeight =
    headerRef.value?.getBoundingClientRect().height ?? 0

  const desktopNavigationHeight =
    window.matchMedia('(min-width: 1301px)').matches
      ? 145
      : 0

  const offset = Math.max(
    headerHeight + 24,
    desktopNavigationHeight
  )

  return (
    window.scrollY +
    section.getBoundingClientRect().top -
    offset
  )
}

function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = 'smooth'
) {
  const section = document.getElementById(sectionId)

  if (!section) return

  const top = getSectionOffset(section)

  window.scrollTo({
    top: Math.max(0, top),
    behavior
  })

  activeSection.value = sectionId
}

function navigateTo(sectionId: string) {
  closeAll()

  const section = document.getElementById(sectionId)

  if (!section) return

  const url = new URL(window.location.href)

  url.hash = sectionId

  window.history.replaceState(
    window.history.state,
    '',
    url
  )

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  scrollToSection(
    sectionId,
    prefersReducedMotion ? 'instant' : 'smooth'
  )
}


/* =========================================
   ACTIVE SECTION TRACKING
========================================= */

let scrollFrame = 0

function updateActiveSection() {
  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame)
  }

  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0

    const activationLine = 180

    const sections = navigation
      .map(item => {
        const element = document.getElementById(item.id)

        if (!element) return null

        return {
          id: item.id,
          top: element.getBoundingClientRect().top
        }
      })
      .filter(
        (item): item is { id: string; top: number } =>
          item !== null
      )
      .sort((a, b) => a.top - b.top)

    if (!sections.length) return

    // Если достигли самого низа страницы,
    // активируем последний доступный раздел.
    const isAtPageBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 5

    if (isAtPageBottom) {
      activeSection.value = sections[sections.length - 1].id
      return
    }

    let currentSection = sections[0].id

    for (const section of sections) {
      if (section.top <= activationLine) {
        currentSection = section.id
      } else {
        break
      }
    }

    activeSection.value = currentSection
  })
}


/* =========================================
   OUTSIDE CLICK
========================================= */

function handleOutsideClick(event: PointerEvent) {
  const target = event.target

  if (!(target instanceof Node)) return

  const clickedInsideHeader =
    headerRef.value?.contains(target) ?? false

  if (!clickedInsideHeader) {
    closeAll()
  }
}


/* =========================================
   KEYBOARD
========================================= */

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeAll()
  }
}


/* =========================================
   RESPONSIVE
========================================= */

let mobileMedia: MediaQueryList | null = null

function handleBreakpointChange(
  event: MediaQueryListEvent
) {
  if (!event.matches) {
    closeAll()
  }
}


/* =========================================
   BODY SCROLL LOCK
========================================= */

let previousBodyOverflow = ''

watch(
  isMobileMenuOpen,
  isOpen => {
    if (isOpen) {
      previousBodyOverflow = document.body.style.overflow

      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = previousBodyOverflow
    }
  }
)


/* =========================================
   INITIAL HASH
========================================= */

function handleInitialHash() {
  const hash = decodeURIComponent(
    window.location.hash.slice(1)
  )

  requestAnimationFrame(() => {
    if (hash && navigation.some(item => item.id === hash)) {
      scrollToSection(hash, 'instant')
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })

      updateActiveSection()
    }
  })
}


/* =========================================
   LIFECYCLE
========================================= */

onMounted(() => {
  window.history.scrollRestoration = 'manual'

  document.addEventListener(
    'pointerdown',
    handleOutsideClick
  )

  window.addEventListener(
    'keydown',
    handleKeydown
  )

  window.addEventListener(
    'scroll',
    updateActiveSection,
    { passive: true }
  )

  window.addEventListener(
    'resize',
    updateActiveSection,
    { passive: true }
  )

  mobileMedia = window.matchMedia(
    '(max-width: 1300px)'
  )

  mobileMedia.addEventListener(
    'change',
    handleBreakpointChange
  )

  handleInitialHash()
})


onUnmounted(() => {
  window.history.scrollRestoration = 'auto'

  document.removeEventListener(
    'pointerdown',
    handleOutsideClick
  )

  window.removeEventListener(
    'keydown',
    handleKeydown
  )

  window.removeEventListener(
    'scroll',
    updateActiveSection
  )

  window.removeEventListener(
    'resize',
    updateActiveSection
  )

  mobileMedia?.removeEventListener(
    'change',
    handleBreakpointChange
  )

  if (scrollFrame) {
    cancelAnimationFrame(scrollFrame)
  }

  document.body.style.overflow = previousBodyOverflow
})
</script>
