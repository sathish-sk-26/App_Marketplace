<template>
  <div class="filter-chip-wrapper">
    <Chip @click="showModal = !showModal">
      <Icon name="filter" :size="16" />
      Refine
      <span v-if="modelValue.length > 0" class="filter-badge">{{ modelValue.length }}</span>
      <Icon name="arrowDown" :size="14" />
    </Chip>
    <button v-if="modelValue.length > 0" class="clear-btn" @click.stop="$emit('clear')">
      ✕
    </button>

    <FilterModal
      :open="showModal"
      :title="title"
      :options="options"
      :model-value="modelValue"
      @close="showModal = false"
      @apply="onApply"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <template #label="{ option }">
        {{ option.label }}
        <Icon name="star" :size="14" class="filter-star" />
      </template>
    </FilterModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Chip from './Chip.vue'
import Icon from './Icon.vue'
import FilterModal from './FilterModal.vue'

defineProps({
  title: { type: String, default: 'Filter' },
  options: { type: Array, required: true },
  modelValue: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue', 'apply', 'clear'])
const showModal = ref(false)

function onApply() {
  emit('apply')
  showModal.value = false
}
</script>

<style scoped>
.filter-chip-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--primary-500);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}
.clear-btn {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--gray-500);
  font-size: 16px;
  cursor: pointer;
  transition: all .2s ease;
}
.clear-btn:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
  color: var(--primary-600);
}
.filter-star {
  color: var(--gray-400);
}
</style>
