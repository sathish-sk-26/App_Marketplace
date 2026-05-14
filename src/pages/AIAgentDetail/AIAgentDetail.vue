<template>
  <div class="page">
    <!-- 1. Sticky marketplace top nav -->
    <TopNav />

    <!-- 2. Hero app header — full size, shown before scroll -->
    <div ref="heroEl" class="container">
      <AppHeader :app="appData" :hide-create-account="true" />
    </div>

    <!-- 3. Sticky compact header — appears after scroll passes hero -->
    <div class="sticky-header" :class="{ visible: scrolled }">
      <div class="container compact-row">
        <a href="#" class="back-btn" @click.prevent aria-label="Back">
          <Icon name="arrowLeft" :size="16" />
        </a>
        <div class="compact-identity">
          <div class="compact-icon" :style="{ background: appData.iconBg }" aria-hidden="true">
            {{ appData.iconLetter }}
          </div>
          <span class="compact-name">
            {{ appData.name }}
            <Icon v-if="appData.verified" name="badgeCheck" :size="15" class="compact-verified" aria-label="Verified" />
          </span>
        </div>
        <div class="compact-cta">
          <button class="btn btn-primary">Update</button>
          <button class="icon-btn" aria-label="More actions">
            <Icon name="more" :size="18" />
          </button>
        </div>
      </div>
      <div class="container">
        <TabsBar :tabs="tabs" :active="activeTab" @update:active="activeTab = $event" />
      </div>
    </div>

    <main class="container">
      <!-- 4. Stats card -->
      <AppStats :app="appData" @navigate-to-reviews="activeTab = 'reviews'" @navigate-to-pricing="activeTab = 'pricing'" />

      <!-- 5. Tab bar — visible when not scrolled -->
      <div class="tabs-normal" :class="{ hidden: scrolled }">
        <TabsBar :tabs="tabs" :active="activeTab" @update:active="activeTab = $event" />
      </div>

      <!-- 6. Tab panels -->
      <section
        :id="`panel-${activeTab}`"
        role="tabpanel"
        :aria-labelledby="`tab-${activeTab}`"
        class="panel"
      >
        <component :is="tabComponent" :app="appData" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { aiAgentData as appData } from './aiAgentData.js'

import TopNav     from '@/pages/AppDetail/components/TopNav.vue'
import AppHeader  from '@/pages/AppDetail/components/AppHeader.vue'
import AppStats   from '@/pages/AppDetail/components/AppStats.vue'
import TabsBar    from '@/pages/AppDetail/components/TabsBar.vue'
import Icon       from '@/components/Icon.vue'

import OverviewTab            from '@/pages/AppDetail/components/tabs/OverviewTab.vue'
import PricingTab             from '@/pages/AppDetail/components/tabs/PricingTab.vue'
import PermissionsTab         from '@/pages/AppDetail/components/tabs/PermissionsTab.vue'
import ReviewsTab             from '@/pages/AppDetail/components/tabs/ReviewsTab.vue'
import GetStartedTab          from '@/pages/AppDetail/components/tabs/GetStartedTab.vue'
import ExternalConnectionTab  from '@/pages/AppDetail/components/tabs/ExternalConnectionTab.vue'

const tabs = [
  { id: 'overview',           label: 'Overview' },
  { id: 'pricing',            label: 'Pricing' },
  { id: 'permissions',        label: 'Permissions' },
  { id: 'reviews',            label: 'Reviews', count: appData.reviewCount },
  { id: 'getStarted',         label: 'Get started' },
  { id: 'externalConnection', label: 'External connection' },
]

const activeTab = ref('overview')

const tabComponent = computed(() => ({
  overview:           OverviewTab,
  getStarted:         GetStartedTab,
  externalConnection: ExternalConnectionTab,
  pricing:            PricingTab,
  permissions:        PermissionsTab,
  reviews:            ReviewsTab
}[activeTab.value]))

const scrolled = ref(false)
const heroEl = ref(null)

function onScroll() {
  const heroBottom = heroEl.value ? heroEl.value.getBoundingClientRect().bottom : 200
  scrolled.value = heroBottom < 0
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #e6e3ff 0%, var(--color-neutral-white-base, #FFF) 70%), var(--color-neutral-white-base, #FFF);
  background-size: 100% 420px;
  background-repeat: repeat-x;
  background-attachment: fixed;
}

/* Sticky compact header */
.sticky-header {
  position: sticky;
  top: var(--nav-height);
  z-index: 40;
  /* background: var(--surface); */
  border-bottom: 1px solid transparent;
  max-height: 0;
  overflow: hidden;
  transition: max-height .2s ease, border-color .2s ease;
}
.sticky-header.visible {
  max-height: 120px;
  border-bottom-color: var(--border);
  background: var(--surface);
}

.compact-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 4px;
}

.back-btn {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px;
  border-radius: 4px;
  color: var(--gray-500);
  text-decoration: none;
  flex-shrink: 0;
}
.back-btn:hover { color: var(--gray-800); background: var(--gray-100); }

.compact-identity {
  display: flex; align-items: center; gap: 8px;
  flex: 1; min-width: 0;
}
.compact-icon {
  width: 28px; height: 28px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 13px;
  flex-shrink: 0;
}
.compact-name {
  font-size: var(--hr-text-md);
  font-weight: 700; color: var(--gray-900);
  display: inline-flex; align-items: center; gap: 5px;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.compact-verified { color: var(--primary-500); flex-shrink: 0; }

.compact-cta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

.btn {
  height: 40px;
  padding: 0 18px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-weight: 600;
  font-size: var(--hr-text-sm);
  cursor: pointer;
}
.btn-primary { background: var(--primary-500); color: #fff; }
.btn-primary:hover { background: var(--primary-600); }

.icon-btn {
  width: 36px; height: 36px; border-radius: 4px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--gray-700); cursor: pointer;
  display: inline-flex; align-items: center; justify-content: center;
}
.icon-btn:hover { background: var(--gray-50); }

/* Normal (non-sticky) tab bar */
.tabs-normal { margin-top: 20px; }
.tabs-normal.hidden { visibility: hidden; }

.panel { padding-block: 24px 64px; }
</style>
