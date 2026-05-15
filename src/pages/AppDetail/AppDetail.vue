<template>
  <div class="page">
    <!-- 1. Sticky marketplace top nav -->
    <TopNav />

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
          <div class="scope-select" ref="scopeSelectRef">
            <button
              class="scope-btn"
              :aria-expanded="stickyOpen"
              aria-haspopup="listbox"
              @click="stickyOpen = !stickyOpen"
            >
              {{ stickyScope }}
              <Icon name="chevronDown" :size="16" />
            </button>
            <ul v-if="stickyOpen" class="scope-menu" role="listbox">
              <li
                v-for="s in appData.scopes"
                :key="s"
                role="option"
                :aria-selected="stickyScope === s"
                :class="{ active: stickyScope === s }"
                @mousedown.prevent="selectStickyScope(s)"
              >
                {{ s }}
                <Icon v-if="stickyScope === s" name="check" :size="14" />
              </li>
            </ul>
          </div>
          <span class="cta-divider" aria-hidden="true"></span>
          <button class="btn btn-primary">Update</button>
          <button class="btn btn-primary">Install to more sub-accounts</button>
          <div class="more-select" ref="stickyMoreRef">
            <button class="icon-btn" aria-label="More actions" :aria-expanded="stickyMoreOpen" @click="stickyMoreOpen = !stickyMoreOpen">
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="14" viewBox="0 0 3 14" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5ZM0 6.75C0 5.92157 0.671573 5.25 1.5 5.25C2.32843 5.25 3 5.92157 3 6.75C3 7.57843 2.32843 8.25 1.5 8.25C0.671573 8.25 0 7.57843 0 6.75ZM0 12C0 11.1716 0.671573 10.5 1.5 10.5C2.32843 10.5 3 11.1716 3 12C3 12.8284 2.32843 13.5 1.5 13.5C0.671573 13.5 0 12.8284 0 12Z" fill="#475467"/>
              </svg>
            </button>
            <ul v-if="stickyMoreOpen" class="more-menu" role="menu">
              <li role="menuitem" @click="stickyMoreOpen = false">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"></path>
                  <path d="M10 11v6M14 11v6"></path>
                  <path d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path>
                </svg>
                Uninstall
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="container">
        <TabsBar :tabs="tabs" :active="activeTab" @update:active="activeTab = $event" />
      </div>
    </div>

    <main class="container">
      <button class="back-link" type="button">
        <Icon name="arrowLeft" :size="16" />
        Back
      </button>
      <div class="app-card">
        <!-- 2. Hero app header — full size, shown before scroll -->
        <div ref="heroEl">
          <AppHeader :app="appData" />
        </div>

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
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { appData as rawAppData } from './data.js'

const appData = { ...rawAppData, isAIAgent: false }

import TopNav     from './components/TopNav.vue'
import AppHeader  from './components/AppHeader.vue'
import AppStats   from './components/AppStats.vue'
import TabsBar    from './components/TabsBar.vue'
import Icon       from '@/components/Icon.vue'

import OverviewTab            from './components/tabs/OverviewTab.vue'
import PricingTab             from './components/tabs/PricingTab.vue'
import PermissionsTab         from './components/tabs/PermissionsTab.vue'
import ReviewsTab             from './components/tabs/ReviewsTab.vue'
import GetStartedTab          from './components/tabs/GetStartedTab.vue'
import ExternalConnectionTab  from './components/tabs/ExternalConnectionTab.vue'

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

const stickyOpen = ref(false)
const stickyMoreOpen = ref(false)
const stickyScope = ref(appData.defaultScope)
const scopeSelectRef = ref(null)
const stickyMoreRef = ref(null)

function selectStickyScope(s) { stickyScope.value = s; stickyOpen.value = false }

function handleClickOutside(event) {
  if (scopeSelectRef.value && !scopeSelectRef.value.contains(event.target)) {
    stickyOpen.value = false
  }
  if (stickyMoreRef.value && !stickyMoreRef.value.contains(event.target)) {
    stickyMoreOpen.value = false
  }
}

function onScroll() {
  const heroBottom = heroEl.value ? heroEl.value.getBoundingClientRect().bottom : 200
  scrolled.value = heroBottom < 0
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('mousedown', handleClickOutside)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.page { min-height: 100vh; background: var(--gray-50); }

/* Sticky compact header */
.sticky-header {
  position: sticky;
  top: var(--nav-height);
  z-index: 40;
  border-bottom: 1px solid transparent;
  height: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity .2s ease, border-color .2s ease;
}
.sticky-header.visible {
  height: auto;
  opacity: 1;
  pointer-events: auto;
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

.compact-cta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; position: relative; }
.compact-cta .cta-divider {
  width: 1px; height: 24px; background: var(--border);
}
.compact-cta .scope-select { position: relative; }
.compact-cta .scope-btn {
  display: inline-flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 14px;
  border: 1px solid var(--border); border-radius: 4px;
  background: var(--surface); color: var(--gray-900);
  font-size: var(--hr-text-sm); font-weight: 500;
  cursor: pointer;
}
.compact-cta .scope-btn:hover { border-color: var(--gray-300); }
.compact-cta .scope-menu {
  position: absolute; top: calc(100% + 4px); inset-inline-start: 0;
  margin: 0; padding: 4px 0; list-style: none;
  background: #FFF; border: 1px solid #D0D5DD; border-radius: 0.25rem;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 160px; z-index: 20;
}
.compact-cta .scope-menu li {
  padding: 8px 12px; font-size: var(--font-size-md, 1rem);
  color: rgba(52, 64, 84, 1);
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; transition: all .2s ease;
}
.compact-cta .scope-menu li:hover { background: var(--gray-50); }
.compact-cta .scope-menu li.active { color: var(--primary-600); }

.compact-cta .more-select { position: relative; }
.compact-cta .more-menu {
  position: absolute; top: calc(100% + 4px); inset-inline-end: 0;
  margin: 0; padding: 4px 0; list-style: none;
  background: #FFF; border: 1px solid #D0D5DD; border-radius: 6px;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 160px; z-index: 20;
}
.compact-cta .more-menu li {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 12px; font-size: var(--hr-text-sm);
  color: var(--gray-700); cursor: pointer;
  transition: background 0.2s ease;
}
.compact-cta .more-menu li:hover { background: var(--gray-50); }
.compact-cta .icon-btn {
  width: 40px; height: 40px;
}
.compact-cta .icon-btn svg circle { fill: currentColor; }

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

/* Back link */
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 8px;
  height: 36px;
  padding: 0 14px;
  border: none;
  border-radius: 6px;
  background: transparent;
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-700);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}
.back-link:hover {
  background: var(--gray-100);
  color: var(--gray-900);
}

/* App card wrapper */
.app-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 24px;
  margin-top: 12px;
  margin-bottom: 24px;
}

/* Normal (non-sticky) tab bar */
.tabs-normal { margin-top: 20px; }
.tabs-normal.hidden { visibility: hidden; }

.panel { padding-block: 24px 0; }
</style>
