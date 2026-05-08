<template>
  <div class="get-started">
    <h2 class="page-title">Lets get it setup for you!</h2>

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
        <div class="link-head">
          <span class="link-title">{{ link.title }}</span>
          <Icon name="chevronRight" :size="16" class="link-arrow" />
        </div>
        <p class="link-desc">{{ link.description }}</p>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({ app: { type: Object, required: true } })

const playing = ref(false)
const providerName = computed(() => props.app.externalProvider || 'Jobber Leadconnector')
const videoPoster = computed(() =>
  props.app.media?.video?.poster ||
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80'
)
const videoUrl = computed(() =>
  props.app.media?.video?.url || 'https://www.youtube.com/embed/dQw4w9WgXcQ'
)

const links = [
  {
    title: 'Configure Review Settings',
    description: 'Connect and manage reviews from Google, Facebook, Yelp, and 40+ platforms in one place.'
  },
  {
    title: 'Configure Voice AI Agent',
    description: 'Setup VoiceAI Agents to answer calls, transcribe, summarize, and trigger the next pre configured workflow on auto-pilot.'
  },
  {
    title: 'Review Workflows',
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
  padding: 18px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  text-decoration: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.link-card:hover {
  border-color: var(--primary-300, var(--primary-500));
  box-shadow: var(--shadow-sm);
}
.link-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--primary-600);
  font-size: var(--hr-text-md);
  font-weight: 600;
}
.link-arrow { color: var(--primary-600); }
.link-desc {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  line-height: 1.5;
  text-align: center;
}

@media (max-width: 900px) {
  .link-grid { grid-template-columns: 1fr; }
  .video-card { aspect-ratio: 16 / 9; }
}
</style>
