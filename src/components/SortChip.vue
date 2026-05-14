<template>
  <div class="sort-chip-wrapper" ref="sortChipRef">
    <Chip @click="toggleMenu">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.2444 2.74408C5.56984 2.41864 6.09748 2.41864 6.42291 2.74408L9.75625 6.07741C10.0817 6.40285 10.0817 6.93049 9.75625 7.25592C9.43081 7.58136 8.90317 7.58136 8.57774 7.25592L6.66699 5.34518V16.6667C6.66699 17.1269 6.2939 17.5 5.83366 17.5C5.37342 17.5 5.00033 17.1269 5.00033 16.6667V5.34518L3.08958 7.25592C2.76414 7.58136 2.23651 7.58136 1.91107 7.25592C1.58563 6.93049 1.58563 6.40285 1.91107 6.07741L5.2444 2.74408ZM13.3337 14.6548V3.33333C13.3337 2.8731 13.7068 2.5 14.167 2.5C14.6272 2.5 15.0003 2.8731 15.0003 3.33333V14.6548L16.9111 12.7441C17.2365 12.4186 17.7641 12.4186 18.0896 12.7441C18.415 13.0695 18.415 13.5972 18.0896 13.9226L14.7562 17.2559C14.4308 17.5814 13.9032 17.5814 13.5777 17.2559L10.2444 13.9226C9.91897 13.5972 9.91897 13.0695 10.2444 12.7441C10.5698 12.4186 11.0975 12.4186 11.4229 12.7441L13.3337 14.6548Z" fill="currentColor"/>
      </svg>
      Sort
      <Icon name="chevronDown" :size="16" />
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
