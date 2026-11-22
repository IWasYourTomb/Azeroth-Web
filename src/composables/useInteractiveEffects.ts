import { onMounted, onUnmounted } from 'vue'

export function useInteractiveEffects() {
  let hero: HTMLElement | null = null
  let heroBackground: HTMLElement | null = null

  let animationFrame = 0

  let mouseX = 0
  let mouseY = 0

  const cards: HTMLElement[] = []

  const mediaQuery = window.matchMedia(
    '(pointer: fine) and (hover: hover)'
  )

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  )

  function handleHeroMouseMove(event: MouseEvent) {
    if (!hero || !heroBackground) return

    const rect = hero.getBoundingClientRect()

    mouseX = (event.clientX - rect.left) / rect.width - 0.5
    mouseY = (event.clientY - rect.top) / rect.height - 0.5

    cancelAnimationFrame(animationFrame)

    animationFrame = requestAnimationFrame(() => {
      if (!hero || !heroBackground) return

      heroBackground.style.transform = `
        translate3d(${mouseX * -16}px, ${mouseY * -12}px, 0)
        scale(1.06)
      `

      hero.style.setProperty(
        '--pointer-x',
        `${(mouseX + 0.5) * 100}%`
      )

      hero.style.setProperty(
        '--pointer-y',
        `${(mouseY + 0.5) * 100}%`
      )
    })
  }

  function resetHero() {
    if (!hero || !heroBackground) return

    heroBackground.style.transform = 'translate3d(0, 0, 0) scale(1.06)'

    hero.style.setProperty('--pointer-x', '50%')
    hero.style.setProperty('--pointer-y', '50%')
  }

  function handleCardMouseMove(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement

    const rect = card.getBoundingClientRect()

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -5
    const rotateY = ((x - centerX) / centerX) * 5

    card.style.setProperty('--tilt-x', `${rotateY}deg`)
    card.style.setProperty('--tilt-y', `${rotateX}deg`)

    card.style.setProperty('--glow-x', `${x}px`)
    card.style.setProperty('--glow-y', `${y}px`)
  }

  function resetCard(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement

    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
  }

  function initialize() {
    if (!mediaQuery.matches || reducedMotion.matches) return

    hero = document.querySelector('.hero')
    heroBackground = document.querySelector('.hero-background')

    if (hero && heroBackground) {
      hero.addEventListener('mousemove', handleHeroMouseMove)
      hero.addEventListener('mouseleave', resetHero)
    }

    cards.push(
      ...document.querySelectorAll<HTMLElement>('.expansion-card')
    )

    cards.forEach(card => {
      card.addEventListener('mousemove', handleCardMouseMove)
      card.addEventListener('mouseleave', resetCard)
    })
  }

  function cleanup() {
    cancelAnimationFrame(animationFrame)

    if (hero && heroBackground) {
      hero.removeEventListener('mousemove', handleHeroMouseMove)
      hero.removeEventListener('mouseleave', resetHero)
    }

    cards.forEach(card => {
      card.removeEventListener('mousemove', handleCardMouseMove)
      card.removeEventListener('mouseleave', resetCard)
    })

    cards.length = 0
  }

  onMounted(initialize)
  onUnmounted(cleanup)
}