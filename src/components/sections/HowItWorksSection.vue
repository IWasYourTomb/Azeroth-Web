<template>
  <section id="how-it-works" class="how-it-works">
    <div class="how-it-works__ambient"></div>

    <div class="how-it-works__container">

      <!-- HEADER -->
      <div class="how-it-works__heading reveal">
        <span class="section-eyebrow">
          {{ t('howItWorks.eyebrow') }}
        </span>

        <h2>
          {{ t('howItWorks.title') }}
          <span>{{ t('howItWorks.titleAccent') }}</span>
        </h2>

        <p>
          {{ t('howItWorks.description') }}
        </p>
      </div>


      <!-- STEPS -->
      <div class="how-it-works__steps">

        <div
          v-for="(step, index) in steps"
          :key="step.number"
          class="how-step reveal"
          :style="{ '--step-index': index }"
        >
          <div class="how-step__top">
            <span class="how-step__number">
              {{ step.number }}
            </span>

            <div class="how-step__icon">
              <component
                :is="step.icon"
                :size="25"
                :stroke-width="1.5"
              />
            </div>
          </div>

          <div class="how-step__content">
            <h3>{{ t(step.title) }}</h3>

            <p>{{ t(step.description) }}</p>
          </div>

          <div class="how-step__footer">
            <span>
              {{ t('howItWorks.step') }} {{ step.number }}
            </span>

            <ArrowUpRight :size="16" />
          </div>
        </div>

      </div>


      <!-- FOOTER -->
      <div class="how-it-works__footer reveal">
        <div class="how-it-works__footer-icon">
          <Sparkles :size="19" />
        </div>

        <p>
          {{ t('howItWorks.footer') }}
        </p>

        <a
          href="#download"
          @click.prevent="scrollToDownload"
        >
          {{ t('howItWorks.cta') }}

          <ArrowRight :size="16" />
        </a>
      </div>

    </div>
  </section>
</template>


<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import {
  Download,
  FolderOpen,
  Settings2,
  Gamepad2,
  ArrowUpRight,
  ArrowRight,
  Sparkles
} from 'lucide-vue-next'

const { t } = useI18n()

const steps = [
  {
    number: '01',
    title: 'howItWorks.steps.install.title',
    description: 'howItWorks.steps.install.description',
    icon: Download
  },
  {
    number: '02',
    title: 'howItWorks.steps.add.title',
    description: 'howItWorks.steps.add.description',
    icon: FolderOpen
  },
  {
    number: '03',
    title: 'howItWorks.steps.configure.title',
    description: 'howItWorks.steps.configure.description',
    icon: Settings2
  },
  {
    number: '04',
    title: 'howItWorks.steps.play.title',
    description: 'howItWorks.steps.play.description',
    icon: Gamepad2
  }
]

function scrollToDownload() {
  document.getElementById('download')?.scrollIntoView({
    behavior: window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches ? 'instant' : 'smooth',
    block: 'start'
  })
}
</script>


<style scoped>
.how-it-works {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding: 130px 24px;
}

.how-it-works__ambient {
  position: absolute;
  z-index: -1;
  top: 15%;
  left: 50%;
  width: 700px;
  height: 400px;
  transform: translateX(-50%);
  background: radial-gradient(
    ellipse,
    var(--accent-glow),
    transparent 70%
  );
  opacity: .12;
  pointer-events: none;
}

.how-it-works__container {
  width: min(1180px, 100%);
  margin: 0 auto;
}

/* HEADING */

.how-it-works__heading {
  max-width: 680px;
  margin: 0 auto 76px;
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

.how-it-works__heading h2 {
  margin: 0;
  color: var(--text);
  font-size: clamp(36px, 5vw, 58px);
  font-weight: 700;
  letter-spacing: -.045em;
  line-height: 1.1;
}

.how-it-works__heading h2 span {
  color: var(--accent-light);
}

.how-it-works__heading p {
  max-width: 540px;
  margin: 22px auto 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
}


/* STEPS */

.how-it-works__steps {
  position: relative;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.how-it-works__steps::before {
  content: '';
  position: absolute;
  top: 43px;
  left: 12%;
  right: 12%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--accent),
    var(--accent),
    transparent
  );
  opacity: .35;
  pointer-events: none;
}

.how-step {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 285px;
  padding: 28px 25px 22px;
  border: 1px solid var(--border);
  border-radius: 18px;
  background: var(--surface-glass);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  transition:
    transform .35s ease,
    border-color .35s ease,
    background .35s ease,
    box-shadow .35s ease;
}

.how-step:hover {
  transform: translateY(-7px);
  border-color: var(--accent);
  box-shadow: 0 18px 45px rgba(0, 0, 0, .12);
}

.how-step__top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 42px;
}

.how-step__number {
  color: var(--accent-light);
  font-family: inherit;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .12em;
}

.how-step__icon {
  position: relative;
  z-index: 1;
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border: 1px solid var(--border-gold);
  border-radius: 15px;
  color: var(--accent-light);
  background: var(--surface);
  box-shadow: 0 0 24px var(--accent-glow);
  transition:
    transform .35s ease,
    background .35s ease;
}

.how-step:hover .how-step__icon {
  transform: rotate(-5deg) scale(1.08);
  background: var(--surface-hover);
}

.how-step__content {
  flex: 1;
}

.how-step__content h3 {
  margin: 0 0 12px;
  color: var(--text);
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -.025em;
}

.how-step__content p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

.how-step__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 28px;
  padding-top: 17px;
  border-top: 1px solid var(--border);
  color: var(--muted);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.how-step__footer svg {
  color: var(--accent-light);
  transition: transform .25s ease;
}

.how-step:hover .how-step__footer svg {
  transform: translate(3px, -3px);
}


/* FOOTER */

.how-it-works__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  margin-top: 55px;
  padding: 22px 26px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--surface-glass);
}

.how-it-works__footer-icon {
  display: grid;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  place-items: center;
  border-radius: 12px;
  color: var(--accent-light);
  background: var(--surface);
}

.how-it-works__footer p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.how-it-works__footer a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  color: var(--accent-light);
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: gap .25s ease;
}

.how-it-works__footer a:hover {
  gap: 13px;
}


/* LIGHT THEME */

:root[data-theme="light"] .how-step {
  background: rgba(255, 255, 255, .72);
  box-shadow: 0 8px 30px rgba(70, 50, 20, .04);
}

:root[data-theme="light"] .how-step:hover {
  box-shadow: 0 18px 45px rgba(70, 50, 20, .1);
}

:root[data-theme="light"] .how-step__icon {
  background: #fff;
}

:root[data-theme="light"] .how-it-works__footer {
  background: rgba(255, 255, 255, .72);
}


/* RESPONSIVE */

@media (max-width: 900px) {
  .how-it-works__steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .how-it-works__steps::before {
    display: none;
  }
}

@media (max-width: 600px) {
  .how-it-works {
    padding: 90px 20px;
  }

  .how-it-works__heading {
    margin-bottom: 48px;
  }

  .how-it-works__steps {
    grid-template-columns: 1fr;
    gap: 14px;
  }

  .how-step {
    min-height: 240px;
  }

  .how-step__top {
    margin-bottom: 28px;
  }

  .how-it-works__footer {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 14px;
    margin-top: 35px;
  }

  .how-it-works__footer p {
    flex: 1;
    min-width: 180px;
  }

  .how-it-works__footer a {
    margin-left: 54px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .how-step,
  .how-step__icon,
  .how-step__footer svg,
  .how-it-works__footer a {
    transition: none;
  }

  .how-step:hover {
    transform: none;
  }
}
</style>