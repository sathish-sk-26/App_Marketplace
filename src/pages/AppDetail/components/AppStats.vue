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
        <h2 class="locations-title">All Installed locations</h2>
        <button class="locations-close" aria-label="Close" @click="locationsOpen = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </header>

      <div class="locations-search">
        <div class="search-input">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.66634 2.66634C4.90492 2.66634 2.66634 4.90492 2.66634 7.66634C2.66634 10.4278 4.90492 12.6663 7.66634 12.6663C9.00841 12.6663 10.227 12.1376 11.1251 11.277C11.1458 11.2483 11.1691 11.2208 11.195 11.1949C11.2209 11.1691 11.2483 11.1458 11.2771 11.125C12.1376 10.2269 12.6663 9.00838 12.6663 7.66634C12.6663 4.90492 10.4278 2.66634 7.66634 2.66634ZM12.5914 11.6485C13.4721 10.5606 13.9997 9.17509 13.9997 7.66634C13.9997 4.16854 11.1641 1.33301 7.66634 1.33301C4.16854 1.33301 1.33301 4.16854 1.33301 7.66634C1.33301 11.1641 4.16854 13.9997 7.66634 13.9997C9.17512 13.9997 10.5607 13.4721 11.6486 12.5913L13.5283 14.4711C13.7886 14.7314 14.2107 14.7314 14.4711 14.4711C14.7314 14.2107 14.7314 13.7886 14.4711 13.5283L12.5914 11.6485Z" fill="#98A2B3"/>
          </svg>
          <input v-model="locationsQuery" type="search" placeholder="Search sub-accounts" />
        </div>
      </div>

      <ul class="locations-list">
        <li v-for="loc in filteredLocations" :key="loc.name" class="location-row">
          <span class="location-avatar">{{ loc.name.charAt(0).toUpperCase() }}</span>
          <div class="location-meta">
            <div class="location-name">{{ loc.name }}</div>
            <div v-if="loc.address" class="location-address">{{ loc.address }}</div>
          </div>
        </li>
        <li v-if="!filteredLocations.length" class="location-empty">No sub-accounts match your search.</li>
      </ul>
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
  { name: "Jorge's Watch Repair (demo)" },
  { name: 'V2 Industry - Creative - Tattoo Shop', address: '555 Main' },
  { name: 'Speed', address: '7 PD, Pune' },
  { name: 'Affiliate Accelerator', address: '4821 Pine Ridge Trail' },
  { name: 'Ask AI - Andrew Test 3', address: '400 North Saint Paul St, Suite 925A' },
  { name: 'Ask AI - Andrew Test 2', address: '400 North Saint Paul St, Suite 925A' },
  { name: 'Ask AI - Andrew Test', address: '400 North Saint Paul St, Suite 925A' },
  { name: 'V2 Industry - Business Coaching & Consulting - Real Estate', address: '420 Market St' },
  { name: 'V2 Industry - Health & Wellness - Med Spa', address: '120 Elm Ave' },
  { name: 'Bright Roots Studio', address: '88 Birch Way' },
  { name: 'Northwind Plumbing', address: '17 Ocean Blvd' },
  { name: 'Olive & Co Marketing', address: '321 Sycamore Ln' },
  { name: 'Bark & Beyond', address: '910 Oak Park Rd' },
  { name: 'TechScale Agency', address: '24 Innovation Dr' },
  { name: 'YUNG\'NRICH', address: '11 King St' },
  { name: "Chacho's Kids", address: '7 Sunshine Ave' }
]
const visibleLocations = computed(() => {
  const count = Math.max(0, props.app.subAccountInstalls || 0)
  if (count <= allLocations.length) return allLocations.slice(0, count)
  const out = [...allLocations]
  while (out.length < count) {
    const src = allLocations[out.length % allLocations.length]
    out.push({ name: `${src.name} #${Math.floor(out.length / allLocations.length) + 1}`, address: src.address })
  }
  return out
})
const filteredLocations = computed(() => {
  const q = locationsQuery.value.trim().toLowerCase()
  if (!q) return visibleLocations.value
  return visibleLocations.value.filter(l =>
    l.name.toLowerCase().includes(q) ||
    (l.address && l.address.toLowerCase().includes(q))
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
  border-radius: var(--radius-lg);
  width: min(560px, 100%);
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.locations-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px 12px;
}
.locations-title {
  margin: 0;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
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
.locations-search { padding: 0 24px 12px; }
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
}
.search-input:focus-within { border-color: var(--primary-500); }
.search-icon { flex-shrink: 0; color: #98A2B3; }
.search-input input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: 0;
  background: transparent;
  outline: none;
  color: var(--gray-900);
  font-family: Inter, sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  letter-spacing: 0;
}
.search-input input::placeholder { color: var(--gray-500, #667085); }
.search-input input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }
.locations-list {
  margin: 0;
  padding: 0 12px 16px;
  list-style: none;
  overflow-y: auto;
}
.location-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
.location-row:hover { background: var(--gray-50); }
.location-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--gray-100);
  color: var(--gray-700);
  font-weight: 600;
  font-size: var(--hr-text-sm);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.location-meta { min-width: 0; }
.location-name {
  font-size: var(--hr-text-sm);
  font-weight: 500;
  color: var(--gray-900);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.location-address {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
  margin-top: 2px;
}
.location-empty {
  padding: 16px 12px;
  text-align: center;
  color: var(--gray-500);
  font-size: var(--hr-text-sm);
}
</style>
