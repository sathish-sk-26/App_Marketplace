<template>
  <div class="permissions">
    <h2 class="section-title">Permissions requested</h2>
    <p class="lead">
      This app requests access to the following resources within your account.
    </p>

    <div class="permissions-list">
      <div v-for="(permission, index) in app.permissions" :key="index" class="permission-group">
        <button
          class="permission-header"
          :class="{ expanded: expandedIndex === index }"
          @click="expandedIndex = expandedIndex === index ? -1 : index"
        >
          <div class="header-left">
            <Icon :name="permission.icon" :size="20" />
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
          <div class="permission-item">
            <span class="item-description">{{ getCombinedDescription(permission.children) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'

defineProps({ app: { type: Object, required: true } })

const expandedIndex = ref(-1)

function getCombinedDescription(children) {
  return children.map(child => child.description).join(' and ')
}

function getBadgeClass(access) {
  if (access === 'Read') return 'badge-read'
  if (access === 'Write') return 'badge-write'
  return 'badge-default'
}
</script>

<style scoped>
.permissions {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-title {
  margin: 0;
  font-size: var(--hr-text-xl);
  font-weight: 600;
}

.lead {
  margin: 0;
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

.item-description {
  color: var(--gray-700);
  font-size: var(--hr-text-sm);
  line-height: 1.5;
  width: 80%;
}
</style>
