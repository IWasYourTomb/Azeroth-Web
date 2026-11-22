import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'

interface MetaDefinition {
  name?: string
  property?: string
  content: string
}

function setMetaTag(definition: MetaDefinition) {
  const attribute = definition.name ? 'name' : 'property'
  const value = definition.name ?? definition.property

  if (!value) return

  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${value}"]`
  )

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, value)
    document.head.appendChild(element)
  }

  element.content = definition.content
}

export function useSeo() {
  const { t, locale } = useI18n()

  watchEffect(() => {
    const currentLocale = locale.value
    const title = t('seo.title')
    const description = t('seo.description')
    const ogImage = `${window.location.origin}/images/og-image.png`

    document.title = title
    document.documentElement.lang = currentLocale

    setMetaTag({ name: 'description', content: description })
    setMetaTag({ name: 'robots', content: 'index, follow' })

    // Open Graph
    setMetaTag({ property: 'og:type', content: 'website' })
    setMetaTag({ property: 'og:title', content: title })
    setMetaTag({ property: 'og:description', content: description })
    setMetaTag({ property: 'og:site_name', content: 'Azeroth Launcher' })
    setMetaTag({
      property: 'og:locale',
      content: currentLocale === 'ru' ? 'ru_RU' : 'en_US'
    })
    setMetaTag({
      property: 'og:locale:alternate',
      content: currentLocale === 'ru' ? 'en_US' : 'ru_RU'
    })
    setMetaTag({ property: 'og:image', content: ogImage })
    setMetaTag({ property: 'og:image:width', content: '1200' })
    setMetaTag({ property: 'og:image:height', content: '630' })
    setMetaTag({
      property: 'og:image:alt',
      content: 'Azeroth Launcher — World of Warcraft for macOS'
    })

    // Twitter / X
    setMetaTag({ name: 'twitter:card', content: 'summary_large_image' })
    setMetaTag({ name: 'twitter:title', content: title })
    setMetaTag({ name: 'twitter:description', content: description })
    setMetaTag({ name: 'twitter:image', content: ogImage })
    setMetaTag({
      name: 'twitter:image:alt',
      content: 'Azeroth Launcher — World of Warcraft for macOS'
    })
  })
}
