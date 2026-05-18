<template>
  <div class="app-header" :class="{ compact }">
    <div class="header-row">
      <div class="identity">
        <div
          class="app-icon"
          :style="{ background: app.iconBg }"
          aria-hidden="true"
        >
          {{ app.iconLetter }}
        </div>
        <div class="meta">
          <h1 class="title">
            {{ app.name }}
            <Icon
              v-if="app.verified"
              name="badgeCheck"
              :size="18"
              class="verified"
              aria-label="Verified app"
            />
            <Link size="md" class="whats-new-link" @click="whatsNewOpen = true">What's new</Link>
          </h1>
          <p v-if="!compact" class="tagline">{{ app.tagline }}</p>
          <p v-if="app.developer" class="developer">By {{ app.developer }}</p>
        </div>
      </div>

      <div class="cta-wrapper">
        <div class="cta">
          <div class="scope-select" ref="scopeSelectRef">
            <button
              class="scope-btn"
              :aria-expanded="open"
              aria-haspopup="listbox"
              @click="open = !open"
              @blur="onBlur"
            >
              {{ scope }}
              <Icon name="chevronDown" :size="16" />
            </button>
            <ul v-if="open" class="scope-menu" role="listbox">
              <li
                v-for="s in app.scopes"
                :key="s"
                role="option"
                :aria-selected="scope === s"
                :class="{ active: scope === s }"
                @mousedown.prevent="select(s)"
              >
                {{ s }}
                <Icon v-if="scope === s" name="check" :size="14" />
              </li>
            </ul>
          </div>

          <span class="cta-divider" aria-hidden="true"></span>

          <button class="btn btn-primary">Update</button>

          <button class="btn btn-primary" @click="installOpen = true">Install to more sub-accounts</button>

          <div class="more-select" ref="moreSelectRef">
            <button class="icon-btn" aria-label="More actions" :aria-expanded="moreOpen" @click="moreOpen = !moreOpen">
              <svg xmlns="http://www.w3.org/2000/svg" width="3" height="14" viewBox="0 0 3 14" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5ZM0 6.75C0 5.92157 0.671573 5.25 1.5 5.25C2.32843 5.25 3 5.92157 3 6.75C3 7.57843 2.32843 8.25 1.5 8.25C0.671573 8.25 0 7.57843 0 6.75ZM0 12C0 11.1716 0.671573 10.5 1.5 10.5C2.32843 10.5 3 11.1716 3 12C3 12.8284 2.32843 13.5 1.5 13.5C0.671573 13.5 0 12.8284 0 12Z" fill="#475467"/>
              </svg>
            </button>
            <ul v-if="moreOpen" class="more-menu" role="menu">
              <li role="menuitem" class="uninstall-item" @click="moreOpen = false; uninstallOpen = true">
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
        <p v-if="!hideCreateAccount" class="cta-help">
          New to {{ app.name }}? <a href="#" class="cta-help-link" @click.prevent>Create an account.</a>
        </p>
      </div>
    </div>

    <!-- What's new modal -->
    <div
      v-if="whatsNewOpen"
      class="whats-new-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="What's new"
      @click.self="whatsNewOpen = false"
    >
      <div class="whats-new-modal">
        <header class="whats-new-head">
          <div>
            <div class="whats-new-eyebrow">Version {{ app.appDetails?.version || '—' }} · {{ app.appDetails?.updated || '' }}</div>
            <h2 class="whats-new-title">What's new in {{ app.name }}</h2>
          </div>
          <button class="whats-new-close" aria-label="Close" @click="whatsNewOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </header>

        <div class="whats-new-body">
          <section class="whats-new-section">
            <h3 class="whats-new-h3">New</h3>
            <ul>
              <li>Faster install flow with location pre-selection.</li>
              <li>Granular permission cards with one-click reviewing.</li>
              <li>Multi-channel concierge support across LiveChat, WhatsApp, SMS, Instagram, and Facebook.</li>
            </ul>
          </section>

          <section class="whats-new-section">
            <h3 class="whats-new-h3">Improvements</h3>
            <ul>
              <li>Sentence-case copy across the marketplace for clarity.</li>
              <li>Updated permission icons with HighLevel design tokens.</li>
              <li>Smarter "Show more" on long descriptions (now respects 8-line threshold).</li>
            </ul>
          </section>

          <section class="whats-new-section">
            <h3 class="whats-new-h3">Fixes</h3>
            <ul>
              <li>Resolved icon misalignment in stacked agent variation.</li>
              <li>Fixed phone number formatting for international support contacts.</li>
            </ul>
          </section>
        </div>

        <footer class="whats-new-foot">
          <button class="btn btn-primary" @click="whatsNewOpen = false">Got it</button>
        </footer>
      </div>
    </div>

    <InstallSubaccountsModal
      :open="installOpen"
      :app-name="app.name"
      :next-version="'3.0.0'"
      :count="app.subAccountInstalls"
      @close="installOpen = false"
      @next="installOpen = false"
    />

    <InstallSubaccountsModal
      :open="uninstallOpen"
      :app-name="app.name"
      :next-version="'3.0.0'"
      :count="app.subAccountInstalls"
      title="Select Sub-Account to Uninstall"
      subtitle="To continue with app uninstallation"
      @close="uninstallOpen = false"
      @next="uninstallOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Icon from '@/components/Icon.vue'
import Link from '@/components/Link.vue'
import InstallSubaccountsModal from '@/components/InstallSubaccountsModal.vue'

const props = defineProps({
  app: { type: Object, required: true },
  compact: { type: Boolean, default: false },
  hideCreateAccount: { type: Boolean, default: false }
})

const open = ref(false)
const moreOpen = ref(false)
const whatsNewOpen = ref(false)
const installOpen = ref(false)
const uninstallOpen = ref(false)
const scope = ref(props.app.defaultScope)
const scopeSelectRef = ref(null)
const moreSelectRef = ref(null)

function select(s) { scope.value = s; open.value = false }

function handleClickOutside(event) {
  if (scopeSelectRef.value && !scopeSelectRef.value.contains(event.target)) {
    open.value = false
  }
  if (moreSelectRef.value && !moreSelectRef.value.contains(event.target)) {
    moreOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<style scoped>
.app-header { padding-block: 0 28px; transition: padding .2s ease; }
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
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
.app-header.compact { padding-block: 12px; }

.header-row {
  display: flex; align-items: center; gap: 24px; flex-wrap: wrap;
}
.identity { display: flex; align-items: center; gap: 16px; flex: 1; min-width: 0; }
.app-icon {
  width: 64px; height: 64px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 26px;
  flex-shrink: 0;
  box-shadow: var(--shadow-sm);
}
.compact .app-icon { width: 36px; height: 36px; font-size: 18px; border-radius: 8px; }
.meta { min-width: 0; }
.title {
  margin: 0;
  font-size: var(--hr-text-xl);
  font-weight: 700; color: var(--gray-900);
  display: inline-flex; align-items: center; gap: 8px;
  line-height: 1.2;
}
.compact .title { font-size: var(--hr-text-xl); }
.verified { color: var(--primary-500); }
.tagline {
  margin: 4px 0 0;
  color: var(--gray-500); font-size: var(--hr-text-sm);
}
.developer {
  margin: 2px 0 0;
  color: var(--gray-400);
  font-size: var(--hr-text-xs);
  font-weight: 500;
}

.cta-wrapper { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
.cta { display: flex; align-items: center; gap: 12px; }
.cta-divider {
  width: 1px;
  height: 28px;
  background: var(--gray-200);
}
.cta-help {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
}
.cta-help-link {
  color: var(--primary-600);
  font-weight: 600;
  text-decoration: none;
}
.cta-help-link:hover { text-decoration: underline; }

.scope-select { position: relative; }
.scope-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--gray-900);
  font-size: var(--hr-text-sm);
  font-weight: 500;
}
.scope-btn:hover { border-color: var(--gray-300); }
.scope-menu {
  position: absolute; top: calc(100% + 4px); inset-inline-start: 0;
  margin: 0; padding: 4px 0; list-style: none;
  background: var(--color-neutral-white-base, #FFF);
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  border-radius: 0.25rem;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 160px; z-index: 20;
}
.scope-menu li {
  padding: 8px 12px;
  font-family: Inter;
  font-weight: 400;
  font-style: normal;
  font-size: var(--font-size-md, 1rem);
  line-height: var(--font-line-height-md, 1.5);
  letter-spacing: var(--font-letter-spacing-normal, 0);
  color: var(--color-neutral-gray-700, rgba(52, 64, 84, 1));
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer;
  transition: all .2s ease;
}
.scope-menu li:hover { background: var(--gray-50); }
.scope-menu li.active { color: var(--primary-600); }

.btn {
  height: 40px; padding: 0 18px; border-radius: 4px;
  border: 1px solid transparent; font-weight: 600;
  font-size: var(--hr-text-sm);
}
.btn-primary {
  background: var(--primary-600); color: #fff;
}
.btn-primary:hover { background: var(--primary-700); }

.icon-btn {
  width: 40px; height: 40px; border-radius: 4px;
  border: 1px solid var(--border); background: var(--surface);
  color: var(--gray-700);
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.icon-btn svg circle {
  fill: currentColor;
}
.icon-btn:hover { background: var(--gray-50); }

.more-select { position: relative; }
.more-menu {
  position: absolute;
  top: calc(100% + 4px);
  inset-inline-end: 0;
  margin: 0;
  padding: 4px 0px;
  list-style: none;
  background: var(--color-neutral-white-base, #FFF);
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  border-radius: 6px;
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 160px;
  z-index: 20;
}
.more-menu li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  cursor: pointer;
  border-radius: 0px;
  transition: background 0.2s ease;
}
.more-menu li:hover { background: var(--gray-50); }
.more-menu li.uninstall-item {
  color: var(--color-secondary-error-500, #F04438);
}
.more-menu li.uninstall-item svg { color: var(--color-secondary-error-500, #F04438); }
.more-menu li.uninstall-item:hover {
  background: var(--error-50, #FEF3F2);
  color: var(--error-700, #B42318);
}
.more-menu li.uninstall-item:hover svg { color: var(--error-700, #B42318); }

@media (max-width: 640px) {
  .header-row { gap: 12px; }
  .cta { width: 100%; justify-content: flex-end; }
}

/* What's new modal */
.whats-new-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 24, 40, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}
.whats-new-modal {
  background: var(--surface);
  border-radius: var(--radius-lg);
  width: min(560px, 100%);
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.whats-new-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 20px 24px 12px;
  gap: 12px;
}
.whats-new-eyebrow {
  font-size: var(--hr-text-xs);
  color: var(--primary-600);
  font-weight: 600;
  margin-bottom: 4px;
}
.whats-new-title {
  margin: 0;
  font-size: var(--hr-text-xl);
  font-weight: 600;
  color: var(--gray-900);
}
.whats-new-close {
  background: transparent;
  border: 0;
  color: var(--gray-500);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
}
.whats-new-close:hover { background: var(--gray-100); color: var(--gray-700); }
.whats-new-body {
  padding: 4px 24px 16px;
  overflow-y: auto;
}
.whats-new-section { margin-bottom: 16px; }
.whats-new-section:last-child { margin-bottom: 0; }
.whats-new-h3 {
  margin: 0 0 8px;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.whats-new-section ul {
  margin: 0;
  padding-left: 20px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  line-height: 1.6;
}
.whats-new-foot {
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px 20px;
  border-top: 1px solid var(--border);
}
</style>
