<template>
  <label class="checkbox-wrapper">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="checkbox-input"
    />
    <span class="checkbox-custom" :class="{ checked: modelValue }">
      <svg v-if="modelValue" xmlns="http://www.w3.org/2000/svg" width="6" height="5" viewBox="0 0 6 5" fill="none" class="checkbox-icon">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.90237 0.0976311C6.03254 0.227806 6.03254 0.438861 5.90237 0.569036L2.2357 4.2357C2.10553 4.36588 1.89447 4.36588 1.7643 4.2357L0.0976311 2.56904C-0.0325437 2.43886 -0.0325437 2.22781 0.0976311 2.09763C0.227806 1.96746 0.438861 1.96746 0.569036 2.09763L2 3.5286L5.43096 0.0976311C5.56114 -0.0325437 5.77219 -0.0325437 5.90237 0.0976311Z" fill="white"/>
      </svg>
    </span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: { type: Boolean, required: true }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

.checkbox-custom {
  width: 16px;
  height: 16px;
  border: 1px solid var(--color-neutral-gray-400, #98A2B3);
  border-radius: 0.125rem;
  background: var(--color-neutral-white-base, #FFF);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all .2s ease;
  flex-shrink: 0;
}

.checkbox-custom.checked {
  border: 1px solid var(--color-primary-blue-600, #155EEF);
  background: var(--color-primary-blue-600, #155EEF);
}

.checkbox-icon {
  width: 0.625rem;
  height: 0.520833rem;
  fill: var(--color-neutral-white-base, #FFF);
}
</style>
