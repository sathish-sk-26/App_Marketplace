<template>
  <div class="sort-chip-wrapper" ref="sortChipRef">
    <Chip @click="toggleMenu">
      <Icon name="arrowDown" :size="16" />
      Sort
      <Icon name="arrowDown" :size="14" />
    </Chip>

    <ul v-if="showMenu" class="sort-menu">
      <li
        v-for="option in options"
        :key="option"
        class="sort-item"
        :class="{ active: modelValue === option }"
        @click="selectSort(option)"
      >
        {{ option }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Chip from './Chip.vue'
import Icon from './Icon.vue'

defineProps({
  options: { type: Array, required: true },
  modelValue: { type: String, required: true }
})

const emit = defineEmits(['update:modelValue', 'open'])
const showMenu = ref(false)
const sortChipRef = ref(null)

function handleClickOutside(event) {
  if (sortChipRef.value && !sortChipRef.value.contains(event.target)) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})

function selectSort(option) {
  emit('update:modelValue', option)
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
.sort-chip-wrapper {
  position: relative;
}

.sort-menu {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid var(--color-neutral-gray-300, #D0D5DD);
  border-radius: 0.25rem;
  background: var(--color-neutral-white-base, #FFF);
  box-shadow: 0 4px 8px -2px rgba(16, 24, 40, 0.10), 0 2px 4px -2px rgba(16, 24, 40, 0.06);
  min-width: 180px;
  z-index: 10;
}
.sort-item {
  padding: 8px 12px;
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
.sort-item:hover {
  background: var(--gray-50);
}
.sort-item.active {
  background: var(--primary-50);
  color: var(--primary-600);
  font-weight: 600;
}
</style>
