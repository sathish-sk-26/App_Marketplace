<template>
  <div class="filter-dropdown-wrapper" ref="filterDropdownRef">
    <Chip @click="toggleMenu" :active="modelValue.length > 0" class="refine-chip">
      <Icon name="filter" :size="16" />
      Refine
      <Badge v-if="modelValue.length > 0" size="sm">{{ modelValue.length }}</Badge>
      <span v-if="modelValue.length > 0" class="separator">|</span>
      <button v-if="modelValue.length > 0" class="clear-btn" @click.stop="$emit('clear')">
        ✕
      </button>
      <Icon name="chevronDown" :size="16" />
    </Chip>

    <div v-if="showMenu" class="filter-menu-container">
      <div class="filter-menu-header">
        <h4 class="filter-menu-title">By rating</h4>
      </div>

      <ul class="filter-menu">
        <li
          v-for="option in options"
          :key="option.value"
          class="filter-item"
          @click="toggleOption(option.value)"
        >
          <Checkbox
            :model-value="pendingSelections.includes(option.value)"
            @update:model-value="toggleOption(option.value)"
            @click.stop
          />
          <span class="filter-label">{{ option.label }}</span>
          <Icon name="star" :size="14" class="filter-star" />
          <span class="filter-count">({{ option.count.toLocaleString() }})</span>
        </li>
      </ul>

      <button class="apply-btn" @click="applySelection">Apply</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import Chip from './Chip.vue'
import Icon from './Icon.vue'
import Badge from './Badge.vue'
import Checkbox from './Checkbox.vue'

const props = defineProps({
  options: { type: Array, required: true },
  modelValue: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue', 'clear', 'open'])
const showMenu = ref(false)
const pendingSelections = ref([])
const filterDropdownRef = ref(null)

// Initialize pending selections with current model value
watch(() => props.modelValue, (newValue) => {
  pendingSelections.value = [...newValue]
}, { immediate: true })

function handleClickOutside(event) {
  if (filterDropdownRef.value && !filterDropdownRef.value.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function toggleOption(value) {
  const idx = pendingSelections.value.indexOf(value)
  if (idx > -1) {
    pendingSelections.value.splice(idx, 1)
  } else {
    pendingSelections.value.push(value)
  }
}

function applySelection() {
  emit('update:modelValue', pendingSelections.value)
  showMenu.value = false
}

function toggleMenu() {
  showMenu.value = !showMenu.value
  if (showMenu.value) {
    emit('open')
  }
}

function closeMenu() {
  showMenu.value = false
}

defineExpose({ closeMenu })
</script>

<style scoped>
.filter-dropdown-wrapper {
  position: relative;
}

.filter-menu-container {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  border-radius: 0.25rem;
  background: var(--color-neutral-white-base, #FFF);
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 240px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.filter-menu-header {
  padding: 12px 12px 0;
  border-bottom: 1px solid var(--gray-100);
}

.filter-menu-title {
  margin: 0 0 8px 0;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}

.filter-menu {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  max-height: 240px;
}

.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  font-family: Inter;
  font-weight: 400;
  font-style: normal;
  font-size: var(--font-size-md, 1rem);
  line-height: var(--font-line-height-md, 1.5);
  letter-spacing: var(--font-letter-spacing-normal, 0);
  color: var(--color-neutral-gray-700, rgba(52, 64, 84, 1));
  cursor: pointer;
  transition: all .2s ease;
}

.filter-item:hover {
  background: var(--gray-50);
}

.filter-label {
  flex: 1;
  font-family: Inter;
  font-weight: 400;
  font-style: normal;
  font-size: var(--font-size-md, 1rem);
  line-height: var(--font-line-height-md, 1.5);
  letter-spacing: var(--font-letter-spacing-normal, 0);
  color: var(--color-neutral-gray-600, rgba(71, 84, 103, 1));
}

.filter-star {
  color: var(--gray-400);
}

.filter-count {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
}

.apply-btn {
  width: calc(100% - 12px);
  margin: 6px;
  padding: 6px 12px;
  border: 1px solid var(--color-primary-blue-600, #155EEF);
  border-radius: 0.5rem;
  background: var(--color-primary-blue-600, #155EEF);
  color: #fff;
  font-size: var(--hr-text-xs);
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(16, 24, 40, 0.05);
  transition: all .2s ease;
}

.apply-btn:hover {
  opacity: 0.9;
}

.apply-btn:active {
  opacity: 0.8;
}

.separator {
  opacity: 0.3;
  font-size: 12px;
  margin: 0 2px;
}

.clear-btn {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--gray-500);
  font-size: 14px;
  cursor: pointer;
  transition: color .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
}

.clear-btn:hover {
  color: var(--primary-600);
}
</style>
