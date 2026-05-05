<template>
  <div v-if="open" class="filter-modal-overlay" @click="$emit('close')">
    <div class="filter-modal" @click.stop>
      <div class="filter-modal-header">
        <h3>{{ title }}</h3>
        <button class="modal-close" @click="$emit('close')">✕</button>
      </div>

      <div class="filter-options">
        <label v-for="option in options" :key="option.value" class="filter-option">
          <input
            type="checkbox"
            :checked="modelValue.includes(option.value)"
            @change="toggleOption(option.value)"
          />
          <span class="checkbox-custom" />
          <span class="filter-label">
            <slot :option="option" name="label">
              {{ option.label }}
            </slot>
          </span>
          <span class="filter-count">({{ option.count.toLocaleString() }})</span>
        </label>
      </div>

      <button class="apply-filter-btn" @click="$emit('apply')">Apply</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  open: { type: Boolean, default: false },
  title: { type: String, default: 'Filter' },
  options: { type: Array, required: true },
  modelValue: { type: Array, required: true }
})

const emit = defineEmits(['close', 'apply', 'update:modelValue'])

function toggleOption(value) {
  const newValue = modelValue.includes(value)
    ? modelValue.filter(v => v !== value)
    : [...modelValue, value]
  emit('update:modelValue', newValue)
}
</script>

<style scoped>
.filter-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  z-index: 100;
}
.filter-modal {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 20px;
  width: 100%;
  max-width: 340px;
  box-shadow: var(--shadow-md);
  animation: slideDown .2s ease;
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.filter-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.filter-modal-header h3 {
  margin: 0;
  font-size: var(--hr-text-md);
  font-weight: 700;
  color: var(--gray-900);
}
.modal-close {
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--gray-500);
  font-size: 18px;
  cursor: pointer;
  transition: color .2s ease;
}
.modal-close:hover { color: var(--gray-800); }

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}
.filter-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all .2s ease;
}
.filter-option:hover {
  background: var(--gray-50);
}
.filter-option input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}
.checkbox-custom {
  width: 20px;
  height: 20px;
  border: 2px solid var(--gray-300);
  border-radius: 4px;
  background: var(--surface);
  flex-shrink: 0;
  transition: all .2s ease;
}
.filter-option input:checked + .checkbox-custom {
  border-color: var(--primary-500);
  background: var(--primary-500);
}
.filter-option input:checked + .checkbox-custom::after {
  content: '✓';
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}
.filter-label {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--hr-text-sm);
  color: var(--gray-900);
  font-weight: 500;
}
.filter-count {
  font-size: var(--hr-text-xs);
  color: var(--gray-500);
}

.apply-filter-btn {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: var(--radius-md);
  background: var(--gray-900);
  color: #fff;
  font-size: var(--hr-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all .2s ease;
}
.apply-filter-btn:hover {
  background: var(--gray-800);
}
</style>
