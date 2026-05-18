<template>
  <div class="permissions">
    <div class="permissions-head">
      <div>
        <h2 class="section-title">Permission</h2>
        <p class="lead">
          Learn about what this app can do in your account
        </p>
      </div>
      <div class="variation-switch" role="tablist" aria-label="Permissions view">
        <button
          v-for="v in variations"
          :key="v.id"
          type="button"
          role="tab"
          :aria-selected="variation === v.id"
          :class="{ active: variation === v.id }"
          @click="variation = v.id"
        >
          {{ v.label }}
        </button>
      </div>
    </div>

    <!-- Variation 1: Accordion -->
    <div v-if="variation === 'accordion'" class="permissions-list">
      <div v-for="(permission, index) in app.permissions" :key="index" class="permission-group">
        <button
          class="permission-header"
          :class="{ expanded: expandedIndex === index }"
          @click="expandedIndex = expandedIndex === index ? -1 : index"
        >
          <div class="header-left">
            <span class="permission-icon" v-html="getPermissionIcon(permission.name)"></span>
            <span class="permission-name">{{ permission.name }}</span>
          </div>
          <Icon
            name="chevronDown"
            :size="20"
            class="chevron"
            :class="{ rotated: expandedIndex === index }"
          />
        </button>

        <div v-if="expandedIndex === index" class="permission-items">
          <ul class="permission-item-list">
            <li v-for="(child, i) in permission.children" :key="i" class="item-description">{{ formatPermission(child.description) }} <span v-if="child.sensitive" class="sensitive-badge">Sensitive</span></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Variation 2: Cards -->
    <div v-else-if="variation === 'cards'" class="permissions-cards">
      <div v-for="(permission, index) in sortedPermissions" :key="permission.name" class="permission-card">
        <div class="permission-card-head">
          <span class="permission-icon-bg" :style="getIconStyle(index)" v-html="getPermissionIcon(permission.name)"></span>
          <span class="permission-name">{{ permission.name }}</span>
        </div>
        <ul class="permission-card-list">
          <li v-for="(child, i) in permission.children" :key="i">{{ formatPermission(child.description) }} <span v-if="child.sensitive" class="sensitive-badge">Sensitive</span></li>
        </ul>
      </div>
    </div>

    <!-- Variation 2b: Cards (Grid) — full-width row, icon+name left, permissions split across 3 columns -->
    <div v-else-if="variation === 'cardsGrid'" class="permissions-grid-cards">
      <div v-for="(permission, index) in sortedPermissions" :key="permission.name" class="permission-grid-card">
        <div class="permission-grid-head">
          <span class="permission-icon-bg" :style="getIconStyle(index)" v-html="getPermissionIcon(permission.name)"></span>
          <span class="permission-name">{{ permission.name }}</span>
        </div>
        <ul class="permission-grid-list">
          <li v-for="(child, i) in permission.children" :key="i">{{ formatPermission(child.description) }} <span v-if="child.sensitive" class="sensitive-badge">Sensitive</span></li>
        </ul>
      </div>
    </div>

    <!-- Variation 2c: Cards (tags) — same as cards but actions shown as tag chips -->
    <div v-else-if="variation === 'cardsTags'" class="permissions-cards">
      <div v-for="(permission, index) in sortedPermissions" :key="permission.name" class="permission-card">
        <div class="permission-card-head">
          <span class="permission-icon-bg" :style="getIconStyle(index)" v-html="getPermissionIcon(permission.name)"></span>
          <span class="permission-name">{{ permission.name }}</span>
        </div>
        <ul class="permission-card-list">
          <li v-for="(child, i) in permission.children" :key="i">
            <span class="line-text">
              {{ parseChild(child.description).subject }} will
              <template v-for="(a, ai) in parseChild(child.description).actions" :key="ai">
                <Tag size="sm" rounded class="access-tag" :class="`access-${a}`" icon="">{{ a }}</Tag>
                <span v-if="ai < parseChild(child.description).actions.length - 1" class="line-and">and</span>
              </template>
            </span>
            <Tag v-if="child.sensitive" rounded size="sm" class="sensitive-tag" icon="">Sensitive</Tag>
          </li>
        </ul>
      </div>
    </div>

    <!-- Variation 3: List -->
    <div v-else class="permissions-rows">
      <div v-for="(permission, index) in app.permissions" :key="index" class="permission-row">
        <span class="permission-icon-bg" :style="getIconStyle(index)" v-html="getPermissionIcon(permission.name)"></span>
        <div class="permission-row-meta">
          <div class="permission-name">{{ permission.name }}</div>
          <p class="permission-row-desc">
            {{ permission.description || getCombinedDescription(permission.children) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/Icon.vue'
import Tag from '@/components/Tag.vue'
import { permissionIcons } from '../../permissionIcons.js'

function parseChild(desc) {
  if (!desc) return { subject: '', actions: [] }
  const m = desc.match(/^(.+?)\s+will\s+(.+?)\.?\s*$/i)
  if (!m) return { subject: desc.replace(/\.$/, ''), actions: [] }
  const subject = m[1].trim()
  const actions = m[2].split(/\s+and\s+/i).map(v => v.replace(/\.$/, '').trim().toLowerCase()).filter(Boolean)
  return { subject, actions }
}

function formatPermission(desc) {
  if (!desc) return ''
  const m = desc.match(/^(.+?)\s+will\s+(.+?)\.?\s*$/i)
  if (!m) return desc
  const subject = m[1].trim()
  const actions = m[2].trim().replace(/\.$/, '').replace(/\bread\b/gi, 'Read').replace(/\bwrite\b/gi, 'Write')
  const connector = /^Access\b/i.test(subject) ? 'to' : '-'
  return `${subject} ${connector} ${actions}.`
}

const props = defineProps({ app: { type: Object, required: true } })

const sortedPermissions = computed(() =>
  [...props.app.permissions]
    .filter(p => !!permissionIcons[p.name])
    .sort((a, b) => (b.children?.length || 0) - (a.children?.length || 0))
)

const expandedIndex = ref(-1)
const variation = ref('cards')
const expandedCards = ref({})
function toggleCard(index) {
  expandedCards.value = { ...expandedCards.value, [index]: !expandedCards.value[index] }
}

const variations = [
  { id: 'accordion', label: 'Accordion' },
  { id: 'cards',     label: 'Cards' },
  { id: 'cardsGrid', label: 'Cards (grid)' },
  { id: 'cardsTags', label: 'Cards (tags)' },
  { id: 'list',      label: 'List' }
]

const palette = [
  { bg: '#EFF4FF', fg: '#155EEF' }, // primary-50 / 600
  { bg: '#ECFDF3', fg: '#039855' }, // success-50 / 600
  { bg: '#FEF3F2', fg: '#D92D20' }, // error-50 / 600
  { bg: '#FFFAEB', fg: '#DC6803' }, // warning-50 / 600
  { bg: '#F4F3FF', fg: '#7839EE' }, // purple-50
  { bg: '#FDF2FA', fg: '#DD2590' }, // pink-50
  { bg: '#ECFEFF', fg: '#0E7090' }, // cyan-50
  { bg: '#FFF1F3', fg: '#E31B54' }, // rose-50
  { bg: '#F0FDF9', fg: '#0E9384' }, // teal-50
  { bg: '#FFF6ED', fg: '#E04F16' }  // orange-50
]
function getIconStyle(index) {
  const c = palette[index % palette.length]
  return { background: c.bg, color: c.fg }
}

function getCombinedDescription(children) {
  return children.map(child => formatPermission(child.description)).join(' and ')
}

function getAccessTags(children) {
  const set = new Set()
  for (const c of children || []) {
    if (c.access) set.add(c.access)
  }
  return [...set]
}

function getBadgeClass(access) {
  if (access === 'Read') return 'badge-read'
  if (access === 'Write') return 'badge-write'
  return 'badge-default'
}


function getPermissionIcon(name) {
  return permissionIcons[name] || ''
}
</script>

<style scoped>
.permissions {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.section-title {
  margin: 0 0 4px;
  font-size: var(--hr-text-xl);
  font-weight: 600;
}

.lead {
  margin: 0 0 16px 0;
  color: var(--gray-600);
}

.permissions-list {
  display: flex;
  flex-direction: column;
  gap: 0px;
}

.permission-group {
  border: 1px solid var(--color-neutral-gray-200, #EAECF0);
  border-radius: 0;
  overflow: hidden;
  background: var(--color-neutral-white-base, #FFF);
  border-top: none;
}

.permission-group:first-child {
  border-radius: 8px 8px 0 0;
  border-top: 1px solid var(--color-neutral-gray-200, #EAECF0);
}

.permission-group:last-child {
  border-radius: 0 0 8px 8px;
}

.permission-group:only-child {
  border-radius: 8px;
  border-top: 1px solid var(--color-neutral-gray-200, #EAECF0);
}

.permission-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}

.permission-header:hover {
  background: var(--color-neutral-gray-100, #F2F4F7);
}

.permission-header.expanded {
  background: var(--color-neutral-gray-100, #F2F4F7);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.permission-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.permission-name {
  color: var(--color-neutral-gray-900, #101828);
  font-family: Inter;
  font-size: var(--font-size-md, 14px);
  font-style: normal;
  font-weight: var(--font-weight-semibold, 600);
  line-height: var(--font-line-height-sm, 17px);
  letter-spacing: var(--font-letter-spacing-normal, 0);
}

.chevron {
  transition: transform 0.2s ease;
  color: var(--gray-600);
}

.chevron.rotated {
  transform: rotate(180deg);
}

.permission-items {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0;
}

.permission-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 20px 12px 48px;
}
.permission-item-list {
  margin: 0;
  padding: 8px 20px 16px 64px;
  list-style: disc;
}
.permission-item-list .item-description {
  display: list-item;
  padding: 4px 0;
}

.item-description {
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  line-height: 1.5;
}
.permissions-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}
.variation-switch {
  display: inline-flex;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface);
  overflow: hidden;
  flex-shrink: 0;
}
.variation-switch button {
  padding: 6px 12px;
  border: 0;
  background: transparent;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  cursor: pointer;
  border-right: 1px solid var(--border);
  transition: background .15s ease, color .15s ease;
}
.variation-switch button:last-child { border-right: 0; }
.variation-switch button:hover { background: var(--gray-50); }
.variation-switch button.active {
  background: var(--primary-50, #EEF4FF);
  color: var(--primary-700, #1E40AF);
  font-weight: 600;
}

/* Shared icon background (used by cards + list) */
.permission-icon-bg {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--gray-100, #F2F4F7);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.permission-icon-bg :deep(svg) { width: 22px; height: 22px; }
.permission-icon-bg :deep(svg path),
.permission-icon-bg :deep(svg circle),
.permission-icon-bg :deep(svg rect) { fill: currentColor; }

/* Variation 2: Cards */
.permissions-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}
.permission-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  transition: border-color .2s ease, box-shadow .2s ease;
}
.permission-card:hover {
  border-color: var(--gray-300);
  box-shadow: 0 4px 12px rgba(16, 24, 40, 0.06);
}
.permission-card-head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.permission-card-head .permission-name {
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.permission-card-desc {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
  flex-grow: 1;
}
.permission-card-list {
  margin: 0;
  padding-left: 20px;
  list-style: disc;
  flex-grow: 1;
}
.permission-card-list li {
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
  padding: 2px 0;
}
.permission-card-toggle {
  align-self: flex-start;
  margin-top: 8px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--primary-600, #155EEF);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
}
.permission-card-toggle:hover { text-decoration: underline; }
.permission-card-inline {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
  flex-grow: 1;
}
.permission-card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.permission-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: var(--hr-text-xs);
  font-weight: 500;
  border: 1px solid transparent;
}
.permission-tag.read {
  background: #EFF8FF;
  color: #175CD3;
  border-color: #B2DDFF;
}
.permission-tag.write {
  background: #FEF3F2;
  color: #B42318;
  border-color: #FECDCA;
}

/* Variation 2b: Cards (Grid) */
.permissions-grid-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}
.permission-grid-card {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 24px;
  align-items: start;
  padding: 20px;
  border: 1px solid var(--color-neutral-gray-200, #EAECF0);
  border-radius: 8px;
  background: #fff;
}
.permission-grid-head {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}
.permission-grid-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px 24px;
}
.permission-grid-list li {
  position: relative;
  padding-left: 14px;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
}
.permission-grid-list li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.65em;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--gray-400);
}
@media (max-width: 900px) {
  .permission-grid-card { grid-template-columns: 1fr; }
  .permission-grid-list { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 560px) {
  .permission-grid-list { grid-template-columns: 1fr; }
}

/* Variation 3: List */
.permissions-rows {
  display: flex;
  flex-direction: column;
}
.permission-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--border);
}
.permission-row:last-child { border-bottom: 0; }
.permission-row-meta { display: flex; flex-direction: column; gap: 4px; }
.permission-row-meta .permission-name {
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.permission-row-desc {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  line-height: 1.5;
}

@media (max-width: 720px) {
  .permissions-cards { grid-template-columns: 1fr; }
}

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

.sensitive-tag {
  margin-left: auto;
  background: var(--error-50);
  color: var(--error-600);
  border-color: #FECDCA;
  vertical-align: middle;
}

.line-text { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 4px; }
.line-and { color: var(--gray-600); }
.access-tag {
  vertical-align: middle;
  text-transform: capitalize;
  border-radius: 999px;
}
.access-read {
  background: var(--primary-50);
  color: var(--primary-700);
  border-color: var(--primary-200);
}
.access-write {
  background: var(--warning-50);
  color: #B54708;
  border-color: #FEDF89;
}
</style>
