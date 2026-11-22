<template>
  <section id="compatibility" class="compatibility">
    <div class="compatibility__ambient"></div>

    <div class="compatibility__container">

      <header class="compatibility__heading reveal">
        <span class="section-eyebrow">
          {{ t('compatibility.eyebrow') }}
        </span>

        <h2>
          {{ t('compatibility.title') }}
          <span>{{ t('compatibility.titleAccent') }}</span>
        </h2>

        <p>
          {{ t('compatibility.description') }}
        </p>
      </header>


      <div class="compatibility__grid">

        <!-- MACOS -->
        <article class="compatibility-card reveal">
          <div class="compatibility-card__icon">
            <Monitor :size="25" />
          </div>

          <div class="compatibility-card__content">
            <span class="compatibility-card__label">
              {{ t('compatibility.platform.label') }}
            </span>

            <h3>
              {{ t('compatibility.platform.title') }}
            </h3>

            <p>
              {{ t('compatibility.platform.description') }}
            </p>
          </div>

          <div class="compatibility-card__badge">
            <CheckCircle2 :size="15" />
            {{ t('compatibility.platform.badge') }}
          </div>
        </article>


        <!-- APPLE SILICON -->
        <article class="compatibility-card reveal">
          <div class="compatibility-card__icon">
            <Cpu :size="25" />
          </div>

          <div class="compatibility-card__content">
            <span class="compatibility-card__label">
              {{ t('compatibility.architecture.label') }}
            </span>

            <h3>
              {{ t('compatibility.architecture.title') }}
            </h3>

            <p>
              {{ t('compatibility.architecture.description') }}
            </p>
          </div>

          <div class="compatibility-card__badge">
            <CheckCircle2 :size="15" />
            {{ t('compatibility.architecture.badge') }}
          </div>
        </article>


        <!-- GAME CLIENTS -->
        <article class="compatibility-card reveal">
          <div class="compatibility-card__icon">
            <Gamepad2 :size="25" />
          </div>

          <div class="compatibility-card__content">
            <span class="compatibility-card__label">
              {{ t('compatibility.clients.label') }}
            </span>

            <h3>
              {{ t('compatibility.clients.title') }}
            </h3>

            <p>
              {{ t('compatibility.clients.description') }}
            </p>
          </div>

          <div class="compatibility-card__badge">
            <Layers3 :size="15" />
            {{ t('compatibility.clients.badge') }}
          </div>
        </article>


        <!-- RUNTIME -->
        <article class="compatibility-card reveal">
          <div class="compatibility-card__icon">
            <Settings2 :size="25" />
          </div>

          <div class="compatibility-card__content">
            <span class="compatibility-card__label">
              {{ t('compatibility.runtime.label') }}
            </span>

            <h3>
              {{ t('compatibility.runtime.title') }}
            </h3>

            <p>
              {{ t('compatibility.runtime.description') }}
            </p>
          </div>

          <div class="compatibility-card__badge">
            <SlidersHorizontal :size="15" />
            {{ t('compatibility.runtime.badge') }}
          </div>
        </article>

      </div>


      <div class="compatibility__note reveal">
        <Info :size="19" />

        <p>
          {{ t('compatibility.note') }}
        </p>
      </div>

    </div>
  </section>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import {
  Monitor,
  Cpu,
  Gamepad2,
  Settings2,
  Layers3,
  SlidersHorizontal,
  CheckCircle2,
  Info
} from 'lucide-vue-next'

const { t } = useI18n()
</script>


<style scoped>
.compatibility {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 130px 24px;
}

.compatibility__ambient {
  position: absolute;
  z-index: -1;
  top: 20%;
  right: -200px;
  width: 600px;
  height: 500px;
  background: radial-gradient(
    ellipse,
    var(--accent-glow),
    transparent 70%
  );
  opacity: .12;
  pointer-events: none;
}

.compatibility__container {
  width: min(1100px, 100%);
  margin: 0 auto;
}


/* HEADING */

.compatibility__heading {
  max-width: 680px;
  margin: 0 auto 65px;
  text-align: center;
}

.section-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 22px;
  color: var(--accent-light);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .2em;
  text-transform: uppercase;
}

.section-eyebrow::before,
.section-eyebrow::after {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--accent);
  opacity: .7;
}

.compatibility__heading h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 700;
  letter-spacing: -.045em;
  line-height: 1.1;
}

.compatibility__heading h2 span {
  color: var(--accent-light);
}

.compatibility__heading p {
  max-width: 540px;
  margin: 22px auto 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
}


/* GRID */

.compatibility__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}


/* CARD */

.compatibility-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 275px;
  padding: 30px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: var(--surface-glass);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));

  transition:
    transform .35s ease,
    border-color .35s ease,
    box-shadow .35s ease;
}

.compatibility-card:hover {
  transform: translateY(-6px);
  border-color: var(--accent);
  box-shadow: 0 18px 45px rgba(0, 0, 0, .1);
}

.compatibility-card__icon {
  display: grid;
  width: 54px;
  height: 54px;
  margin-bottom: 30px;
  place-items: center;
  border: 1px solid var(--border-gold);
  border-radius: 16px;
  color: var(--accent-light);
  background: var(--surface);
  box-shadow: 0 0 24px var(--accent-glow);
}

.compatibility-card__label {
  color: var(--accent-light);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .16em;
  text-transform: uppercase;
}

.compatibility-card__content h3 {
  margin: 10px 0;
  color: var(--text);
  font-size: 22px;
  font-weight: 650;
  letter-spacing: -.03em;
}

.compatibility-card__content p {
  max-width: 420px;
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.8;
}

.compatibility-card__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  margin-top: auto;
  padding-top: 24px;
  color: var(--accent-light);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: .06em;
}

.compatibility-card__badge svg {
  flex-shrink: 0;
}


/* NOTE */

.compatibility__note {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-top: 30px;
  padding: 22px 25px;
  border: 1px solid var(--border);
  border-radius: 15px;
  background: var(--surface-glass);
}

.compatibility__note > svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: var(--accent-light);
}

.compatibility__note p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.8;
}


/* LIGHT THEME */

:root[data-theme="light"] .compatibility-card {
  background: rgba(255, 255, 255, .76);
  box-shadow: 0 8px 30px rgba(70, 50, 20, .04);
}

:root[data-theme="light"] .compatibility-card:hover {
  box-shadow: 0 18px 45px rgba(70, 50, 20, .1);
}

:root[data-theme="light"] .compatibility-card__icon {
  background: #fff;
}

:root[data-theme="light"] .compatibility__note {
  background: rgba(255, 255, 255, .76);
}


/* RESPONSIVE */

@media (max-width: 700px) {
  .compatibility {
    padding: 90px 20px;
  }

  .compatibility__heading {
    margin-bottom: 45px;
  }

  .compatibility__grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .compatibility-card {
    min-height: 250px;
    padding: 25px;
  }

  .compatibility-card__icon {
    margin-bottom: 24px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .compatibility-card {
    transition: none;
  }

  .compatibility-card:hover {
    transform: none;
  }
}
</style>