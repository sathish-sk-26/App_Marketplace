<template>
  <div class="get-started">
    <h2 class="page-title">Let's get it set up for you</h2>

    <button class="video-card" @click="playing = true" aria-label="Play getting started video">
      <template v-if="!playing">
        <img :src="videoPoster" alt="" class="video-poster" />
        <div class="video-brand">
          <div class="brand-icon">
            <Icon name="package" :size="20" />
          </div>
          <div class="brand-meta">
            <div class="brand-title">{{ providerName }}</div>
            <div class="brand-sub">LeadConnector</div>
          </div>
        </div>
        <span class="video-play"><Icon name="play" :size="28" /></span>
      </template>
      <iframe
        v-else
        :src="videoUrl"
        title="Getting started video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowfullscreen
      />
    </button>

    <div class="link-grid">
      <a v-for="link in links" :key="link.title" href="#" class="link-card" @click.prevent>
        <div class="link-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 17" fill="none" style="margin-bottom: 12px;">
            <path d="M11.6667 0H1.66667C0.75 0 0 0.75 0 1.66667V15C0 15.9167 0.75 16.6667 1.66667 16.6667H11.6667C12.5833 16.6667 13.3333 15.9167 13.3333 15V1.66667C13.3333 0.75 12.5833 0 11.6667 0ZM4.16667 1.66667H5.83333V5.83333L5 5.20833L4.16667 5.83333V1.66667ZM11.6667 15H1.66667V1.66667H2.5V9.16667L5 7.29167L7.5 9.16667V1.66667H11.6667V15Z" fill="var(--color-neutral-gray-500, #667085)"/>
          </svg>
        </div>
        <h3 class="link-title">{{ link.title }}</h3>
        <p class="link-desc">{{ link.description }}</p>
        <div class="link-cta">
          <div class="link-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0.244078 0.244078C0.569515 -0.0813593 1.09715 -0.0813593 1.42259 0.244078L6.42259 5.24408C6.74803 5.56951 6.74803 6.09715 6.42259 6.42259L1.42259 11.4226C1.09715 11.748 0.569515 11.748 0.244078 11.4226C-0.0813592 11.0972 -0.0813592 10.5695 0.244078 10.2441L4.65482 5.83333L0.244078 1.42259C-0.0813592 1.09715 -0.0813592 0.569515 0.244078 0.244078Z" fill="#475467"/>
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({ app: { type: Object, required: true } })

const playing = ref(false)
const providerName = computed(() => props.app.externalProvider || props.app.name)
const videoPoster = computed(() =>
  props.app.media?.video?.poster ||
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80'
)
const videoUrl = computed(() =>
  props.app.media?.video?.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
)

const links = [
  {
    title: 'Configure review settings',
    description: 'Connect and manage reviews from Google, Facebook, Yelp, and 40+ platforms in one place.'
  },
  {
    title: 'Configure Voice AI agent',
    description: 'Set up Voice AI agents to answer calls, transcribe, summarize, and trigger the next pre-configured workflow on auto-pilot.'
  },
  {
    title: 'Review workflows',
    description: 'Capture leads, nurture relationships, and close more sales with less manual work.'
  }
]
</script>

<style scoped>
.get-started { display: flex; flex-direction: column; gap: 20px; }

.page-title {
  margin: 0;
  font-size: var(--hr-text-xl);
  font-weight: 700;
  color: var(--gray-900);
}

.video-card {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 7;
  border: 0;
  padding: 0;
  overflow: hidden;
  border-radius: var(--radius-lg);
  background: #000;
  cursor: pointer;
}
.video-poster { width: 100%; height: 100%; object-fit: cover; display: block; }
.video-card iframe { width: 100%; height: 100%; border: 0; }

.video-brand {
  position: absolute;
  top: 16px;
  inset-inline-start: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px 8px 8px;
  border-radius: 8px;
  pointer-events: none;
}
.brand-icon {
  width: 36px; height: 36px;
  border-radius: 8px;
  background: #6B21A8;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.brand-meta { text-align: left; }
.brand-title {
  color: #fff;
  font-size: var(--hr-text-md);
  font-weight: 700;
  line-height: 1.2;
}
.brand-sub {
  color: rgba(255, 255, 255, 0.85);
  font-size: var(--hr-text-xs);
  line-height: 1.2;
}

.video-play {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 64px; height: 64px;
  border-radius: 50%;
  background: var(--primary-500);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.link-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.link-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.link-card:hover {
  border-color: var(--gray-300);
  background: var(--gray-50);
  transform: translateY(-2px);
}
.link-icon {
  display: flex;
  align-items: center;
  justify-content: left;
}
.link-badge {
  font-size: var(--hr-text-xs);
  font-weight: 600;
  color: var(--gray-500);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.link-title {
  margin: 0;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
  text-align: left;
}
.link-desc {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
  text-align: left;
  flex-grow: 1;
}
.link-cta {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}
.link-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--gray-200);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .link-grid { grid-template-columns: 1fr; }
  .video-card { aspect-ratio: 16 / 9; }
}
</style>
