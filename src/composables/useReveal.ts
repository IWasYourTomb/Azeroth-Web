import { onMounted, onUnmounted } from 'vue'

export function useReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const elements = document.querySelectorAll(
      '.reveal, .feature-card, .expansion-card, .gallery-item'
    )

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return

          entry.target.classList.add('is-visible')
          observer?.unobserve(entry.target)
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    )

    elements.forEach(element => observer?.observe(element))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}