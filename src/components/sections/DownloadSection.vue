<template>
  <section id="download" class="download-showcase">
    <div class="download-ambient"></div>

    <div class="download-container">
      <!-- =========================================
           HEADING
      ========================================== -->

      <div class="download-heading">
        <span class="section-eyebrow">
          {{ t('download.eyebrow') }}
        </span>

        <h2>
          {{ t('download.title') }}
        </h2>

        <p>
          {{ t('download.description') }}
        </p>
      </div>

      <!-- =========================================
           DOWNLOAD CARD
      ========================================== -->

      <div class="download-card glass-panel glass-panel--gold">

        <!-- CARD HEADER -->

        <div class="download-card__top">
          <div class="download-product">
            <div class="download-product__icon">
              <Apple :size="31" />
            </div>

            <div>
              <span class="download-product__label">
                AZEROTH LAUNCHER
              </span>

              <h3>macOS</h3>
            </div>
          </div>

          <div class="download-status">
            <span class="download-status__dot"></span>

            {{ t('download.latestVersion') }}
          </div>
        </div>

        <div class="download-divider"></div>

        <!-- LOADING -->

        <div
          v-if="loading"
          class="download-state"
        >
          <RefreshCw :size="22" class="spin" />

          <span>
            {{ t('download.loading') }}
          </span>
        </div>

        <!-- ERROR -->

        <div
          v-else-if="error"
          class="download-state download-state--error"
        >
          <AlertCircle :size="22" />

          <span>
            {{ t('download.error') }}
          </span>

          <button
            type="button"
            class="button-glass"
            @click="refresh"
          >
            {{ t('download.retry') }}
          </button>
        </div>

        <!-- RELEASE -->

        <template v-else-if="release">

          <!-- VERSION -->

          <div class="download-version">
            <div>
              <span class="download-version__label">
                {{ t('download.latestVersion') }}
              </span>

              <div class="download-version__number">
                {{ release.version }}
              </div>
            </div>

            <div class="download-release-date">
              <CheckCircle2 :size="16" />

              <span>
                {{ t('download.released') }}
                {{ formattedDate }}
              </span>
            </div>
          </div>

          <!-- DOWNLOAD ASSETS -->

          <div class="download-assets">

            <!-- DMG -->

            <a
              v-if="release.dmg"
              :href="release.dmg.url"
              class="download-asset download-asset--primary"
              download
            >
              <Download :size="19" />

              <div>
                <strong>
                  {{ t('download.dmg') }}
                </strong>

                <small>
                  {{ formatSize(release.dmg.size) }}
                </small>
              </div>

              <ArrowUpRight :size="19" />
            </a>

            <div
              v-else
              class="download-asset download-asset--disabled"
            >
              <Download :size="19" />

              <strong>
                {{ t('download.noDmg') }}
              </strong>
            </div>

            <!-- ZIP -->

            <a
              v-if="release.zip"
              :href="release.zip.url"
              class="download-asset"
              download
            >
              <Package :size="19" />

              <div>
                <strong>
                  {{ t('download.zip') }}
                </strong>

                <small>
                  {{ formatSize(release.zip.size) }}
                </small>
              </div>

              <ArrowUpRight :size="19" />
            </a>

            <div
              v-else
              class="download-asset download-asset--disabled"
            >
              <Package :size="19" />

              <strong>
                {{ t('download.noZip') }}
              </strong>
            </div>

          </div>

          <!-- CARD FOOTER -->

          <div class="download-card__footer">
            <span>
              <Apple :size="14" />

              {{ t('download.requirements') }}
            </span>

            <a
              :href="release.releaseUrl"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ t('download.github') }}

              <ArrowUpRight :size="14" />
            </a>
          </div>

        </template>

      </div>

      <!-- =========================================
           RELEASE NOTES
      ========================================== -->

      <Transition name="release-notes">
        <section
          v-if="release && release.description.trim()"
          id="release-notes"
          class="release-notes"
          aria-labelledby="release-notes-title"
        >

          <!-- RELEASE NOTES HEADER -->

          <div class="release-notes__heading">

            <div class="release-notes__title">
              <div class="release-notes__icon">
                <FileText :size="20" />
              </div>

              <div>
                <span class="section-eyebrow">
                  {{ t('download.releaseNotesEyebrow') }}
                </span>

                <h3 id="release-notes-title">
                  {{ t('download.releaseNotesTitle') }}
                </h3>
              </div>
            </div>

            <div class="release-notes__version">
              v{{ release.version }}
            </div>

          </div>

          <!-- RELEASE NOTES CONTENT -->

          <div class="release-notes__content">

            <div class="release-notes__date">
              <CheckCircle2 :size="15" />

              <span>
                {{ t('download.released') }}
                {{ formattedDate }}
              </span>
            </div>

            <p class="release-notes__description">
              {{ release.description }}
            </p>

            <a
              :href="release.releaseUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="release-notes__link"
            >
              {{ t('download.fullReleaseNotes') }}

              <ArrowUpRight :size="15" />
            </a>

          </div>

        </section>
      </Transition>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import {
  Download,
  Apple,
  Package,
  ArrowUpRight,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-vue-next'

import { useLatestRelease } from '../../composables/useLatestRelease'


/* =========================================
   I18N
========================================= */

const { t, locale } = useI18n()


/* =========================================
   RELEASE
========================================= */

const {
  release,
  loading,
  error,
  refresh
} = useLatestRelease()


/* =========================================
   COMPUTED
========================================= */

const formattedDate = computed(() => {
  if (!release.value) return ''

  const date = new Date(release.value.publishedAt)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return new Intl.DateTimeFormat(
    locale.value === 'ru' ? 'ru-RU' : 'en-US',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  ).format(date)
})


/* =========================================
   HELPERS
========================================= */

function formatSize(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) {
    return ''
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}
</script>