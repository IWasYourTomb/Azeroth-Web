import { ref, onMounted } from 'vue'

const REPOSITORY = 'IWasYourTomb/Azeroth-Launcher'

const API_URL = `https://api.github.com/repos/${REPOSITORY}/releases/latest`

const CACHE_TTL = 5 * 60 * 1000
const REQUEST_TIMEOUT = 15_000

interface GitHubAsset {
  name: string
  size: number
  browser_download_url: string
}

interface GitHubRelease {
  tag_name: string
  name: string | null
  body: string | null
  published_at: string
  html_url: string
  assets: GitHubAsset[]
}

export interface ReleaseAsset {
  name: string
  size: number
  url: string
}

export interface LatestRelease {
  version: string
  name: string
  description: string
  publishedAt: string
  releaseUrl: string
  dmg: ReleaseAsset | null
  zip: ReleaseAsset | null
}

interface ReleaseCache {
  data: LatestRelease
  timestamp: number
}

let cache: ReleaseCache | null = null
let pendingRequest: Promise<LatestRelease> | null = null

function isValidRelease(data: unknown): data is GitHubRelease {
  if (!data || typeof data !== 'object') {
    return false
  }

  const release = data as Record<string, unknown>

  return (
    typeof release.tag_name === 'string' &&
    typeof release.published_at === 'string' &&
    typeof release.html_url === 'string' &&
    Array.isArray(release.assets)
  )
}

function mapAsset(asset: GitHubAsset): ReleaseAsset {
  return {
    name: asset.name,
    size: asset.size,
    url: asset.browser_download_url
  }
}

function mapRelease(data: GitHubRelease): LatestRelease {
  const assets = data.assets.filter(
    asset =>
      typeof asset.name === 'string' &&
      typeof asset.size === 'number' &&
      typeof asset.browser_download_url === 'string'
  )

  const dmg = assets.find(asset =>
    asset.name.toLowerCase().endsWith('.dmg')
  )

  const zip = assets.find(asset =>
    asset.name.toLowerCase().endsWith('.zip')
  )

  return {
    version: data.tag_name.replace(/^v/i, ''),
    name: data.name || data.tag_name,
    description: data.body || '',
    publishedAt: data.published_at,
    releaseUrl: data.html_url,

    dmg: dmg ? mapAsset(dmg) : null,
    zip: zip ? mapAsset(zip) : null
  }
}

async function requestRelease(): Promise<LatestRelease> {
  const controller = new AbortController()

  const timeout = setTimeout(
    () => controller.abort(),
    REQUEST_TIMEOUT
  )

  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github+json'
      },
      signal: controller.signal
    })

    if (!response.ok) {
      if (response.status === 403 || response.status === 429) {
        throw new Error('GitHub API rate limit exceeded')
      }

      if (response.status === 404) {
        throw new Error('No published GitHub release found')
      }

      throw new Error(`GitHub API error: ${response.status}`)
    }

    const data: unknown = await response.json()

    if (!isValidRelease(data)) {
      throw new Error('Invalid GitHub release response')
    }

    const release = mapRelease(data)

    cache = {
      data: release,
      timestamp: Date.now()
    }

    return release
  } finally {
    clearTimeout(timeout)
  }
}

async function fetchLatestRelease(
  force = false
): Promise<LatestRelease> {
  if (
    !force &&
    cache &&
    Date.now() - cache.timestamp < CACHE_TTL
  ) {
    return cache.data
  }

  if (pendingRequest) {
    return pendingRequest
  }

  pendingRequest = requestRelease()

  try {
    return await pendingRequest
  } finally {
    pendingRequest = null
  }
}

export function useLatestRelease() {
  const release = ref<LatestRelease | null>(
    cache?.data ?? null
  )

  const loading = ref(!release.value)
  const error = ref(false)

  async function fetchRelease(force = false) {
    loading.value = true
    error.value = false

    try {
      release.value = await fetchLatestRelease(force)
    } catch (err) {
      console.error('Failed to fetch GitHub release:', err)

      error.value = true
    } finally {
      loading.value = false
    }
  }

  function refresh() {
    return fetchRelease(true)
  }

  onMounted(() => {
    if (
      cache &&
      Date.now() - cache.timestamp < CACHE_TTL
    ) {
      release.value = cache.data
      loading.value = false
      return
    }

    fetchRelease()
  })

  return {
    release,
    loading,
    error,
    refresh
  }
}