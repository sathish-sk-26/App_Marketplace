<template>
  <section class="stats" aria-label="App statistics">
    <div class="stat">
      <div class="label">Rating</div>
      <div class="value rating-value" role="button" tabindex="0" @click="emit('navigate-to-reviews')" @keydown.enter="emit('navigate-to-reviews')">
        <span class="num">{{ app.rating.toFixed(1) }}</span>
        <StarRating :model-value="1" :max="1" size="md" />
        <Link size="xs" @click="emit('navigate-to-reviews')">({{ formatted(app.reviewCount) }})</Link>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Who is this app for</div>
      <div class="value">
        <Icon name="users" :size="16" class="muted-icon" />
        <span class="num-md">{{ app.appFor[0] }}</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Who can install</div>
      <div class="value tags-group">
        <div class="tag-item">
          <Tag size="lg" rounded :active="isActive(app.installableBy, 'Agency')" :inactive="!isActive(app.installableBy, 'Agency')" :icon="isActive(app.installableBy, 'Agency') ? 'check' : 'x'">Agency</Tag>
        </div>
        <div class="tag-item">
          <Tag size="lg" rounded :active="isActive(app.installableBy, 'Sub-account')" :inactive="!isActive(app.installableBy, 'Sub-account')" :icon="isActive(app.installableBy, 'Sub-account') ? 'check' : 'x'">Sub-account</Tag>
        </div>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">White-label</div>
      <div class="value">
        <Icon name="checkCircle" :size="16" class="success-icon" />
        <span class="num-md success-text">{{ app.whiteLabel }}</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Installs</div>
      <div class="value">
        <Icon name="download" :size="16" class="muted-icon" />
        <span class="num-md">{{ formatted(app.installs) }}</span>
      </div>
      <Link class="sub-installs-link" size="xs" @click="locationsOpen = true">
        <Icon name="check" :size="12" />
        Installed in {{ app.subAccountInstalls }} sub-accounts
      </Link>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Pricing</div>
      <div class="value pricing-value">
        <div class="pricing-title">{{ app.pricingLabel }}</div>
        <Link size="xs" @click="emit('navigate-to-pricing')">View</Link>
      </div>
    </div>
  </section>

  <!-- All Installed locations modal -->
  <div
    v-if="locationsOpen"
    class="locations-overlay"
    role="dialog"
    aria-modal="true"
    aria-label="All Installed locations"
    @click.self="locationsOpen = false"
  >
    <div class="locations-modal">
      <header class="locations-head">
        <div class="locations-head-row">
          <div class="locations-head-text">
            <h2 class="locations-title">{{ app.name }} app is installed in,</h2>
            <p class="locations-subtitle">Each sub-account shows the current installed version.</p>
          </div>
          <button class="locations-close" aria-label="Close" @click="locationsOpen = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div class="locations-body">
        <div class="search-input">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.66634 2.66634C4.90492 2.66634 2.66634 4.90492 2.66634 7.66634C2.66634 10.4278 4.90492 12.6663 7.66634 12.6663C9.00841 12.6663 10.227 12.1376 11.1251 11.277C11.1458 11.2483 11.1691 11.2208 11.195 11.1949C11.2209 11.1691 11.2483 11.1458 11.2771 11.125C12.1376 10.2269 12.6663 9.00838 12.6663 7.66634C12.6663 4.90492 10.4278 2.66634 7.66634 2.66634ZM12.5914 11.6485C13.4721 10.5606 13.9997 9.17509 13.9997 7.66634C13.9997 4.16854 11.1641 1.33301 7.66634 1.33301C4.16854 1.33301 1.33301 4.16854 1.33301 7.66634C1.33301 11.1641 4.16854 13.9997 7.66634 13.9997C9.17512 13.9997 10.5607 13.4721 11.6486 12.5913L13.5283 14.4711C13.7886 14.7314 14.2107 14.7314 14.4711 14.4711C14.7314 14.2107 14.7314 13.7886 14.4711 13.5283L12.5914 11.6485Z" fill="#98A2B3"/>
          </svg>
          <input v-model="locationsQuery" type="search" placeholder="Search sub-account" />
        </div>

        <table class="locations-table">
          <thead>
            <tr>
              <th>Sub-account</th>
              <th class="version-col">Version</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="loc in filteredLocations" :key="loc.name">
              <td>
                <div class="sub-name">{{ loc.name }}</div>
                <div v-if="loc.location" class="sub-location">{{ loc.location }}</div>
              </td>
              <td class="version-col">
                <span v-if="loc.draft" class="version-pill version-pill--draft">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6"/><path d="M10 3v6L4 20a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-6-11V3"/></svg>
                  Draft
                </span>
                <span v-else class="version-pill">v {{ loc.version }}</span>
              </td>
            </tr>
            <tr v-if="!filteredLocations.length">
              <td colspan="2" class="location-empty">No sub-accounts match your search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import StarRating from '@/components/StarRating.vue'
import Icon from '@/components/Icon.vue'
import Tag from '@/components/Tag.vue'
import Link from '@/components/Link.vue'

const props = defineProps({ app: { type: Object, required: true } })
const emit = defineEmits(['navigate-to-reviews', 'navigate-to-pricing'])

const formatted = (n) => n.toLocaleString('en-US')
const isActive = (arr, value) => Array.isArray(arr) ? arr.includes(value) : false

const locationsOpen = ref(false)
const locationsQuery = ref('')
const allLocations = [
  { name: 'HighLevel test',       location: '1535 Broadway, New York',     version: '1.0.0' },
  { name: 'Test page',            location: '420 Market St, San Francisco', version: '1.1.0' },
  { name: 'Personal page',        location: '88 Birch Way, Austin',         version: '1.1.0' },
  { name: 'Chennai central',      location: 'T Nagar, Chennai',             version: '1.0.0' },
  { name: 'My test',              location: 'Bandra West, Mumbai',          draft: true },
  { name: "Arjun's acc",          location: 'Sector 18, Noida',             version: '1.0.0' },
  { name: 'Test sub acc',         location: 'Indiranagar, Bengaluru',       version: '1.0.0' },
  { name: 'Home',                 location: 'Anna Nagar, Chennai',          version: '1.0.0' },
  { name: 'Bright Roots Studio',  location: '88 Birch Way, Portland',       version: '1.0.0' },
  { name: 'Northwind Plumbing',   location: '17 Ocean Blvd, Miami',         version: '1.1.0' },
  { name: 'Olive & Co Marketing', location: '321 Sycamore Ln, Seattle',     version: '1.0.0' },
  { name: 'Bark & Beyond',        location: '910 Oak Park Rd, Denver',      version: '1.0.0' },
  { name: 'TechScale Agency',     location: '24 Innovation Dr, Boston',     version: '1.1.0' },
  { name: "YUNG'NRICH",           location: '11 King St, London',           version: '1.0.0' },
  { name: "Chacho's Kids",        location: '7 Sunshine Ave, Phoenix',      version: '1.0.0' },
  { name: 'Speed sub acc',        location: '7 PD, Pune',                   draft: true }
]
const visibleLocations = computed(() => {
  const count = Math.max(0, props.app.subAccountInstalls || 0)
  if (count <= allLocations.length) return allLocations.slice(0, count)
  const out = [...allLocations]
  while (out.length < count) {
    const src = allLocations[out.length % allLocations.length]
    out.push({ ...src, name: `${src.name} #${Math.floor(out.length / allLocations.length) + 1}` })
  }
  return out
})
const filteredLocations = computed(() => {
  const q = locationsQuery.value.trim().toLowerCase()
  if (!q) return visibleLocations.value
  return visibleLocations.value.filter(l =>
    l.name.toLowerCase().includes(q) || (l.location && l.location.toLowerCase().includes(q))
  )
})
</script>

<style scoped>
.stats {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 16px 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.stat { min-width: 0; padding: 0 20px; }
.label {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
  margin-bottom: 6px;
}
.value {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-md);
  color: var(--gray-900);
}
.rating-value { gap: 6px; cursor: pointer; transition: opacity 0.2s ease; justify-content: center; }
.rating-value:hover { opacity: 0.7; }
.num {
  font-size: var(--hr-text-lg);
  font-weight: 600;
}
.num-md {
  font-size: var(--hr-text-md);
  font-weight: 500;
}
.muted { color: var(--gray-500); font-size: var(--hr-text-sm); }
.review-count {
  font-size: var(--hr-text-sm);
  color: var(--primary-600);
}
.muted-icon { color: var(--gray-500); }
.sub-installs-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 4px;
}
.success-icon { color: var(--success-500); }
.success-text { color: var(--success-700); }
.pricing-value {
  flex-direction: column !important;
  align-items: flex-start !important;
  gap: 4px !important;
}
.pricing-title {
  font-size: var(--hr-text-md);
  font-weight: 500;
  color: var(--gray-900);
}
.pricing-info {
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
}
.divider {
  width: 1px; height: 36px; background: var(--gray-200);
}
.badge {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 8px; border-radius: 999px;
  font-size: var(--hr-text-xs); font-weight: 500;
}
.badge-success {
  background: var(--success-50); color: var(--success-700);
  border: 1px solid var(--success-200);
}
.tags-group {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.tag-item {
  display: flex;
  align-items: center;
  gap: 4px;
}
@media (max-width: 1024px) {
  .stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px 16px;
    padding: 20px;
  }
  .stat { padding: 0; }
  .divider { display: none; }
  .rating-value { justify-content: left; }
}
@media (max-width: 600px) {
  .stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Locations modal */
.locations-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 24, 40, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}
.locations-modal {
  background: var(--surface);
  border-radius: var(--radius-md);
  width: min(560px, 100%);
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.locations-head {
  display: flex;
  padding: 16px 16px 0 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}
.locations-head-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}
.locations-head-text { display: flex; flex-direction: column; gap: 4px; }
.locations-title {
  margin: 0;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
}
.locations-subtitle {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
}
.locations-close {
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
.locations-close:hover { background: var(--gray-100); color: var(--gray-700); }
.locations-body {
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  overflow: hidden;
  flex: 1;
  min-height: 0;
}
.search-input {
  display: flex;
  align-items: center;
  width: 100%;
  height: 36px;
  padding: 0 12px;
  gap: 8px;
  border-radius: 4px;
  border: 1px solid var(--gray-300, #D0D5DD);
  background: var(--surface, #FFF);
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  box-sizing: border-box;
}
.search-input:focus-within { border-color: var(--primary-500); }
.search-icon { flex-shrink: 0; color: #98A2B3; }
.search-input input {
  flex: 1;
  min-width: 0;
  height: 34px;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  outline: none;
  color: var(--gray-900);
  font-family: Inter, sans-serif;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  box-sizing: border-box;
}
.search-input input::placeholder { color: var(--gray-500, #667085); }
.search-input input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }

/* Table */
.locations-table {
  width: 100%;
  border-collapse: collapse;
  overflow-y: auto;
  display: block;
  flex: 1;
  min-height: 0;
}
.locations-table thead { position: sticky; top: 0; background: var(--gray-50); z-index: 1; }
.locations-table thead tr,
.locations-table tbody tr { display: table; width: 100%; table-layout: fixed; }
.locations-table tbody { display: block; }
.locations-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
  border-bottom: 1px solid var(--border);
  background: var(--gray-50);
}
.locations-table td {
  padding: 8px 12px;
  font-size: var(--hr-text-sm);
  color: var(--gray-900);
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}
.sub-name { font-weight: 500; color: var(--gray-900); }
.sub-location { font-size: var(--hr-text-xs); color: var(--gray-500); margin-top: 2px; }
.locations-table tbody tr:last-child td { border-bottom: 0; }
.locations-table .version-col { width: 140px; }
.version-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 6px;
  background: var(--primary-50);
  color: var(--primary-700);
  font-size: var(--hr-text-sm);
  font-weight: 500;
}
.version-pill--draft {
  background: var(--gray-100);
  color: var(--gray-700);
}
.location-empty {
  padding: 24px 16px;
  text-align: center;
  color: var(--gray-500);
  font-size: var(--hr-text-sm);
}
</style>
