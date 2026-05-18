<template>
  <div class="page">
    <TopNav />

    <div class="container">
      <button class="back-link" type="button">
        <Icon name="arrowLeft" :size="16" />
        Back
      </button>
    </div>

    <div class="container review-wrap">
      <!-- Install confirmation -->
      <section class="review-card">
        <h2 class="review-card-title">Install confirmation</h2>
        <p class="review-intro">You are about to install the Marketplace App. Please review the following information before proceeding with the installation.</p>
        <div class="app-row">
          <div class="app-icon" :style="{ background: app.iconBg }">{{ app.iconLetter }}</div>
          <div class="app-meta">
            <div class="app-name">{{ app.name }}</div>
            <div class="app-tagline">{{ app.tagline }}</div>
            <div class="app-developer">By {{ app.developer }}</div>
          </div>
        </div>
      </section>

      <!-- Locations -->
      <section class="review-card">
        <h2 class="review-card-title">Locations</h2>
        <div class="locations-list">
          <div v-for="loc in locations" :key="loc.name" class="location-row">
            <div class="location-avatar">{{ loc.name.charAt(0) }}</div>
            <div class="location-meta">
              <div class="location-name">{{ loc.name }}</div>
              <div class="location-address">{{ loc.address }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Permissions -->
      <section class="review-card">
        <h2 class="review-card-title">Permissions requested by the app</h2>
        <div class="perm-grid">
          <div v-for="(perm, index) in permissions" :key="perm.name" class="perm-card">
            <div class="perm-card-head">
              <span class="perm-icon" :style="getIconStyle(index)" v-html="getPermissionIcon(perm.name)"></span>
              <span class="perm-name">{{ perm.name }}</span>
            </div>
            <ul class="perm-card-list">
              <li v-for="(line, li) in perm.lines" :key="li">
                {{ line.text }}
                <span v-if="line.sensitive" class="sensitive-badge">Sensitive</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Resources -->
      <section v-if="resources" class="review-card">
        <h2 class="review-card-title">Resources</h2>

        <div class="dev-resources-rows">
          <div class="dev-resources-row">
            <a v-if="resources.website" :href="resources.website" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4"/>
                <ellipse cx="10" cy="10" rx="3" ry="7.5" stroke="currentColor" stroke-width="1.4"/>
                <path d="M2.5 10h15" stroke="currentColor" stroke-width="1.4"/>
              </svg>
              <span>Website</span>
              <span class="ext-btn" aria-label="Open in new tab" role="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
            <a v-if="resources.documentationUrl" :href="resources.documentationUrl" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 2.5h6.5L15.5 6.5v10a1 1 0 0 1-1 1h-9.5a1 1 0 0 1-1-1v-13a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
                <path d="M11.5 2.5v4h4" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
              </svg>
              <span>Documentation</span>
              <span class="ext-btn" aria-label="Open in new tab" role="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
            <a v-if="resources.supportWebsiteUrl" :href="resources.supportWebsiteUrl" target="_blank" rel="noopener" class="dev-resource-link dev-resource-link--external">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <circle cx="10" cy="10" r="7.5" stroke="currentColor" stroke-width="1.4"/>
                <ellipse cx="10" cy="10" rx="3" ry="7.5" stroke="currentColor" stroke-width="1.4"/>
                <path d="M2.5 10h15" stroke="currentColor" stroke-width="1.4"/>
              </svg>
              <span>Support website</span>
              <span class="ext-btn" aria-label="Open in new tab" role="img">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M8 4.5H5.5A1.5 1.5 0 0 0 4 6v8.5A1.5 1.5 0 0 0 5.5 16H14a1.5 1.5 0 0 0 1.5-1.5V12M11 4.5h4.5V9M15 5l-6.5 6.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </span>
            </a>
          </div>
          <div class="dev-resources-row">
            <span v-if="resources.supportEmail" class="dev-resource-link dev-resource-value">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <rect x="2.5" y="4.5" width="15" height="11" rx="1.5" stroke="#667085" stroke-width="1.4"/>
                <path d="M2.5 6l7.5 5L17.5 6" stroke="#667085" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <a :href="`mailto:${resources.supportEmail}`">{{ resources.supportEmail }}</a>
              <button
                class="copy-btn"
                :class="{ copied: copiedKey === resources.supportEmail }"
                type="button"
                :aria-label="`Copy ${resources.supportEmail}`"
                @click="copyToClipboard(resources.supportEmail)"
              >
                <svg v-if="copiedKey === resources.supportEmail" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="6.5" y="6.5" width="9" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M4.5 13.5h-.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5" stroke="currentColor" stroke-width="1.6"/>
                </svg>
                <span v-if="copiedKey === resources.supportEmail" class="copy-toast">Copied!</span>
              </button>
            </span>
            <span v-if="resources.supportPhone" class="dev-resource-link dev-resource-value">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 3h3l1.5 4-2 1.5a10 10 0 0 0 5 5L13 11.5l4 1.5v3A1.5 1.5 0 0 1 15.5 17.5C8.5 17.5 2.5 11.5 2.5 4.5A1.5 1.5 0 0 1 4 3Z" stroke="#667085" stroke-width="1.4" stroke-linejoin="round"/>
              </svg>
              <a :href="`tel:${resources.supportPhone}`">{{ resources.supportPhone }}</a>
              <button
                class="copy-btn"
                :class="{ copied: copiedKey === resources.supportPhone }"
                type="button"
                :aria-label="`Copy ${resources.supportPhone}`"
                @click="copyToClipboard(resources.supportPhone)"
              >
                <svg v-if="copiedKey === resources.supportPhone" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <rect x="6.5" y="6.5" width="9" height="11" rx="1.5" stroke="currentColor" stroke-width="1.6"/>
                  <path d="M4.5 13.5h-.5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v.5" stroke="currentColor" stroke-width="1.6"/>
                </svg>
                <span v-if="copiedKey === resources.supportPhone" class="copy-toast">Copied!</span>
              </button>
            </span>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer actions -->
    <div class="review-footer">
      <div class="container footer-inner">
        <button class="btn btn-secondary">Cancel</button>
        <button class="btn btn-primary">Allow & install</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TopNav from '@/pages/AppDetail/components/TopNav.vue'
import Icon from '@/components/Icon.vue'
import Tag from '@/components/Tag.vue'
import { appData } from '@/pages/AppDetail/data.js'
import { permissionIcons } from '@/pages/AppDetail/permissionIcons.js'

function formatPermission(desc) {
  if (!desc) return ''
  const m = desc.match(/^(.+?)\s+will\s+(.+?)\.?\s*$/i)
  if (!m) return desc
  const subject = m[1].trim()
  const actions = m[2].trim().replace(/\.$/, '').replace(/\bread\b/gi, 'Read').replace(/\bwrite\b/gi, 'Write')
  const connector = /^Access\b/i.test(subject) ? 'to' : '-'
  return `${subject} ${connector} ${actions}.`
}

const resources = appData.resources

const copiedKey = ref('')
function copyToClipboard(value) {
  if (!value) return
  navigator.clipboard?.writeText(value).then(() => {
    copiedKey.value = value
    setTimeout(() => { copiedKey.value = '' }, 1500)
  })
}

const app = {
  name: 'My CRM Support',
  tagline: 'Your one stop shop for CRM support',
  developer: 'MyCRMSupport',
  iconLetter: 'M',
  iconBg: '#2970FF',
  website: 'https://mycrmsupport.com',
}

const locations = [
  { name: 'Suvodip Mondal', address: '1535 Broadway' },
]

const permissions = appData.permissions
  .filter(p => !!permissionIcons[p.name])
  .map(p => ({
    name: p.name,
    lines: p.children.map(c => ({ text: formatPermission(c.description), sensitive: !!c.sensitive })),
  }))
  .sort((a, b) => b.lines.length - a.lines.length)

const palette = [
  { bg: '#F5F8FF', fg: '#155EEF' }, // primary 25 / 600
  { bg: '#F6FEF9', fg: '#039855' }, // success 25 / 600
  { bg: '#FFFBFA', fg: '#D92D20' }, // error 25 / 600
  { bg: '#FFFCF5', fg: '#DC6803' }, // warning 25 / 600
  { bg: '#FAFAFF', fg: '#7839EE' }, // purple 25 / 600
  { bg: '#FEF6FB', fg: '#DD2590' }, // pink 25 / 600
  { bg: '#F5FEFF', fg: '#0E7090' }, // cyan 25 / 600
  { bg: '#FFF5F6', fg: '#E31B54' }, // rose 25 / 600
  { bg: '#F5FEFD', fg: '#0E9384' }, // teal 25 / 600
  { bg: '#FEFAF5', fg: '#E04F16' }  // orange 25 / 600
]
function getIconStyle(index) {
  const c = palette[index % palette.length]
  return { background: c.bg, color: c.fg }
}
function getPermissionIcon(name) {
  return permissionIcons[name] || ''
}
</script>

<style scoped>
.page { min-height: 100vh; background: var(--gray-50); padding-bottom: 80px; }

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

.review-wrap {
  padding: 12px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 20px 24px;
}

.review-card-title {
  margin: 0 0 16px;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
}

.review-intro {
  margin: 0 0 16px;
  color: var(--gray-600);
  font-size: var(--hr-text-sm);
  line-height: 1.5;
}

.app-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.app-icon {
  width: 60px; height: 60px;
  border-radius: var(--radius-sm);
  color: #fff;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: var(--hr-text-md);
}
.app-meta { display: flex; flex-direction: column; gap: 2px; }
.app-name { font-weight: 600; color: var(--gray-900); font-size: var(--hr-text-sm); }
.app-tagline { color: var(--gray-600); font-size: var(--hr-text-sm); }
.app-developer { color: var(--gray-500); font-size: var(--hr-text-xs); }

/* Locations */
.locations-list { display: flex; flex-direction: column; gap: 8px; }
.location-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px;
}
.location-avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: var(--gray-100);
  color: var(--gray-700);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: var(--hr-text-sm);
  flex-shrink: 0;
}
.location-name { font-weight: 500; color: var(--gray-900); font-size: var(--hr-text-sm); }
.location-address { color: var(--gray-500); font-size: var(--hr-text-xs); }

/* Permissions */
.perm-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.perm-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: 16px;
  background: var(--surface);
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.perm-card-head {
  display: flex;
  align-items: center;
  gap: 10px;
}
.perm-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.perm-icon :deep(svg) {
  width: 20px;
  height: 20px;
}
.perm-icon :deep(svg) [fill] { fill: currentColor; }
.perm-name {
  font-weight: 600;
  font-size: var(--hr-text-sm);
  color: var(--gray-900);
}
.perm-card-list {
  margin: 0;
  padding: 0 0 0 20px;
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  line-height: 1.7;
}
.perm-card-list li { padding: 0; }
.sensitive-badge {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  padding: 1px 8px;
  border-radius: 999px;
  background: var(--error-50);
  color: var(--error-600);
  font-size: var(--hr-text-xs);
  font-weight: 500;
  vertical-align: middle;
}
@media (max-width: 960px) {
  .perm-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .perm-grid { grid-template-columns: 1fr; }
}

/* Resources */
.resources-title-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.dev-resources-rows {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px 32px;
  margin-top: 8px;
}
.dev-resources-row { display: contents; }
.dev-resource-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: var(--hr-text-md);
  text-decoration: none;
  font-weight: 500;
}
.dev-resource-link > span,
.dev-resource-link > a { margin-right: 2px; margin-left: 4px; }
.dev-resource-link > .ext-btn { margin: 0; }
.dev-resource-link:hover { text-decoration: underline; }
.dev-resource-link svg { flex-shrink: 0; color: var(--gray-500); }
.dev-resource-link--external { color: var(--gray-700); }
.dev-resource-link--external svg { color: var(--gray-500); }
.dev-resource-link--external .ext-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--gray-500);
  transition: background 0.15s ease, color 0.15s ease;
}
.dev-resource-link--external:hover .ext-btn {
  background: var(--gray-100);
  color: var(--gray-700);
}
.dev-resource-link--external:hover { color: var(--gray-900); }
.dev-resource-value {
  color: var(--gray-700);
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
}
.dev-resource-value:hover { text-decoration: none; }
.dev-resource-value a {
  color: var(--gray-700);
  text-decoration: none;
  font-weight: 500;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dev-resource-value a:hover { color: var(--gray-900); text-decoration: underline; }
.copy-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: var(--gray-500);
  transition: background 0.15s ease, color 0.15s ease;
}
.copy-btn:hover { background: var(--gray-100); color: var(--gray-700); }
.copy-btn.copied { color: #039855; }
.copy-toast {
  position: absolute;
  bottom: calc(100% + 6px);
  left: 50%;
  transform: translateX(-50%);
  padding: 4px 8px;
  background: var(--gray-900, #101828);
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
}

/* Footer */
.review-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--surface);
  border-top: 1px solid var(--border);
  padding: 12px 0;
  z-index: 10;
}
.footer-inner {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.btn {
  height: 36px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-size: var(--hr-text-sm);
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}
.btn-secondary {
  background: var(--surface);
  border-color: var(--border);
  color: var(--gray-700);
}
.btn-secondary:hover { background: var(--gray-50); }
.btn-primary { background: var(--primary-600); color: #fff; }
.btn-primary:hover { background: var(--primary-700); }
</style>
