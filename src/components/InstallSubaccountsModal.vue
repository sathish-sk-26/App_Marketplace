<template>
  <div
    v-if="open"
    class="install-overlay"
    role="dialog"
    aria-modal="true"
    :aria-label="title"
    @click.self="$emit('close')"
  >
    <div class="install-modal">
      <header class="install-head">
        <div class="install-head-row">
          <div class="install-head-text">
            <h2 class="install-title">{{ title }}</h2>
            <p class="install-subtitle">{{ subtitle }}</p>
          </div>
          <button class="install-close" aria-label="Close" @click="$emit('close')">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      </header>

      <div class="install-body">
        <div class="install-controls">
          <div class="search-input">
            <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.66634 2.66634C4.90492 2.66634 2.66634 4.90492 2.66634 7.66634C2.66634 10.4278 4.90492 12.6663 7.66634 12.6663C9.00841 12.6663 10.227 12.1376 11.1251 11.277C11.1458 11.2483 11.1691 11.2208 11.195 11.1949C11.2209 11.1691 11.2483 11.1458 11.2771 11.125C12.1376 10.2269 12.6663 9.00838 12.6663 7.66634C12.6663 4.90492 10.4278 2.66634 7.66634 2.66634ZM12.5914 11.6485C13.4721 10.5606 13.9997 9.17509 13.9997 7.66634C13.9997 4.16854 11.1641 1.33301 7.66634 1.33301C4.16854 1.33301 1.33301 4.16854 1.33301 7.66634C1.33301 11.1641 4.16854 13.9997 7.66634 13.9997C9.17512 13.9997 10.5607 13.4721 11.6486 12.5913L13.5283 14.4711C13.7886 14.7314 14.2107 14.7314 14.4711 14.4711C14.7314 14.2107 14.7314 13.7886 14.4711 13.5283L12.5914 11.6485Z" fill="#98A2B3"/>
            </svg>
            <input v-model="query" type="search" placeholder="Search sub-account" />
          </div>
        </div>

        <div class="install-table-wrap">
          <table class="install-table">
            <thead>
              <tr>
                <th class="check-col">
                  <label class="checkbox">
                    <input type="checkbox" :checked="allSelected" :indeterminate.prop="someSelected && !allSelected" @change="toggleSelectAll" />
                    <span class="check-box"></span>
                  </label>
                </th>
                <th>Sub-account</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="loc in filtered" :key="loc.id" @click="toggle(loc.id)">
                <td class="check-col">
                  <label class="checkbox" @click.stop>
                    <input type="checkbox" :checked="selected.has(loc.id)" @change="toggle(loc.id)" />
                    <span class="check-box"></span>
                  </label>
                </td>
                <td>
                  <div class="sub-name">{{ loc.name }}</div>
                  <div v-if="loc.location" class="sub-location">{{ loc.location }}</div>
                </td>
              </tr>
              <tr v-if="!filtered.length">
                <td colspan="2" class="install-empty">No sub-accounts match your search.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer class="install-foot">
        <button class="btn btn-secondary" @click="$emit('close')">Close</button>
        <button class="btn btn-primary" :disabled="!someSelected" @click="$emit('next', Array.from(selected))">Next</button>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  appName: { type: String, default: 'App' },
  nextVersion: { type: String, default: '3.0.0' },
  count: { type: Number, default: 0 },
  title: { type: String, default: 'Select Sub-Account' },
  subtitle: { type: String, default: 'To continue with app installation' },
})
defineEmits(['close', 'next'])

const seedLocations = [
  { name: 'HighLevel test',       location: '1535 Broadway, New York' },
  { name: 'Test page',            location: '420 Market St, San Francisco' },
  { name: 'Personal page',        location: '88 Birch Way, Austin' },
  { name: 'Chennai central',      location: 'T Nagar, Chennai' },
  { name: 'My test',              location: 'Bandra West, Mumbai' },
  { name: "Arjun's acc",          location: 'Sector 18, Noida' },
  { name: 'Test sub acc',         location: 'Indiranagar, Bengaluru' },
  { name: 'Home',                 location: 'Anna Nagar, Chennai' },
  { name: 'Bright Roots Studio',  location: '88 Birch Way, Portland' },
  { name: 'Northwind Plumbing',   location: '17 Ocean Blvd, Miami' },
  { name: 'Olive & Co Marketing', location: '321 Sycamore Ln, Seattle' },
  { name: 'Bark & Beyond',        location: '910 Oak Park Rd, Denver' },
  { name: 'TechScale Agency',     location: '24 Innovation Dr, Boston' },
  { name: "YUNG'NRICH",           location: '11 King St, London' },
  { name: "Chacho's Kids",        location: '7 Sunshine Ave, Phoenix' },
  { name: 'Speed sub acc',        location: '7 PD, Pune' }
]

const locations = computed(() => {
  const count = Math.max(0, props.count || 0)
  const out = []
  for (let i = 0; i < count; i++) {
    const base = seedLocations[i % seedLocations.length]
    const suffix = i >= seedLocations.length ? ` #${Math.floor(i / seedLocations.length) + 1}` : ''
    out.push({ id: i, name: `${base.name}${suffix}`, location: base.location })
  }
  return out
})

const query = ref('')
const selected = ref(new Set())

watch(() => props.open, (val) => {
  if (val) {
    query.value = ''
    selected.value = new Set(locations.value.map(l => l.id))
  }
})

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return locations.value
  return locations.value.filter(l =>
    l.name.toLowerCase().includes(q) || (l.location && l.location.toLowerCase().includes(q))
  )
})

const allSelected = computed(() => locations.value.length > 0 && selected.value.size === locations.value.length)
const someSelected = computed(() => selected.value.size > 0)

function toggle(id) {
  const next = new Set(selected.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  selected.value = next
}
function toggleSelectAll() {
  if (allSelected.value) selected.value = new Set()
  else selected.value = new Set(locations.value.map(l => l.id))
}
</script>

<style scoped>
.install-overlay {
  position: fixed;
  inset: 0;
  background: rgba(16, 24, 40, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
}
.install-modal {
  background: var(--surface);
  border-radius: var(--radius-md);
  width: min(560px, 100%);
  max-height: 600px;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-md);
  overflow: hidden;
}
.install-head {
  display: flex;
  padding: 16px 16px 0 16px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
}
.install-head-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 12px;
}
.install-head-text { display: flex; flex-direction: column; gap: 4px; }
.install-title {
  margin: 0;
  font-size: var(--hr-text-lg);
  font-weight: 600;
  color: var(--gray-900);
}
.install-subtitle {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
}
.install-close {
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
.install-close:hover { background: var(--gray-100); color: var(--gray-700); }

.install-body {
  display: flex;
  padding: 16px;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.install-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.search-input {
  display: flex;
  align-items: center;
  flex: 1;
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
}
.search-input input::placeholder { color: var(--gray-500); }
.search-input input::-webkit-search-cancel-button { -webkit-appearance: none; appearance: none; }

.deselect-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: transparent;
  border: 0;
  color: var(--primary-600);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  flex-shrink: 0;
}
.deselect-link:hover { text-decoration: underline; }

.install-table-wrap {
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.install-table {
  width: 100%;
  border-collapse: collapse;
  display: block;
  overflow-y: auto;
  flex: 1;
  min-height: 0;
}
.install-table thead { position: sticky; top: 0; background: var(--gray-50); z-index: 1; }
.install-table thead tr,
.install-table tbody tr { display: table; width: 100%; table-layout: fixed; }
.install-table tbody { display: block; }
.install-table th {
  text-align: left;
  padding: 10px 12px;
  height: 44px;
  line-height: 20px;
  vertical-align: middle;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
  border-bottom: 1px solid var(--border);
  background: var(--gray-50);
  box-sizing: border-box;
}
.install-table td {
  padding: 10px 12px;
  font-size: var(--hr-text-sm);
  color: var(--gray-900);
  border-bottom: 1px solid var(--border);
  cursor: pointer;
}
.install-table tbody tr:last-child td { border-bottom: 0; }
.install-table tbody tr:hover { background: var(--gray-50); }
.check-col { width: 48px; }
.sub-name { font-weight: 500; color: var(--gray-900); }
.sub-location { font-size: var(--hr-text-xs); color: var(--gray-500); margin-top: 2px; }

.checkbox {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: 20px;
  height: 20px;
  vertical-align: middle;
}
.checkbox input { position: absolute; opacity: 0; inset: 0; cursor: pointer; }
.check-box {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid var(--gray-300);
  background: var(--surface);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.checkbox input:checked + .check-box {
  background: var(--primary-600);
  border-color: var(--primary-600);
}
.checkbox input:checked + .check-box::after {
  content: '';
  width: 12px;
  height: 12px;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' fill='none'><path d='M2 6.5L4.7 9L10 3.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
  background-repeat: no-repeat;
  background-position: center;
}
.checkbox input:indeterminate + .check-box {
  background: var(--primary-600);
  border-color: var(--primary-600);
}
.checkbox input:indeterminate + .check-box::after {
  content: '';
  width: 10px;
  height: 2px;
  background: #fff;
  border-radius: 1px;
}

.install-empty {
  padding: 24px 16px;
  text-align: center;
  color: var(--gray-500);
  font-size: var(--hr-text-sm);
}

.install-foot {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
}
.btn {
  height: 36px;
  padding: 0 16px;
  border-radius: var(--radius-sm);
  font-weight: 600;
  font-size: var(--hr-text-sm);
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
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
