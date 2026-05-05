<template>
  <section class="stats" aria-label="App statistics">
    <div class="stat">
      <div class="label">Overall Rating</div>
      <div class="value rating-value">
        <span class="num">{{ app.rating.toFixed(1) }}</span>
        <StarRating :model-value="app.rating" size="md" />
        <span class="muted">({{ app.reviewCount }})</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Installs</div>
      <div class="value">
        <Icon name="download" :size="16" class="muted-icon" />
        <span class="num-md">{{ formatted(app.installs) }}</span>
        <span class="badge badge-success">
          <Icon name="check" :size="12" />
          Installed in {{ app.subAccountInstalls }} sub-accounts
        </span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">White-label</div>
      <div class="value">
        <Icon name="checkCircle" :size="16" class="success-icon" />
        <span class="num-md">{{ app.whiteLabel }}</span>
      </div>
    </div>

    <div class="divider" aria-hidden="true" />

    <div class="stat">
      <div class="label">Pricing</div>
      <div class="value">
        <span class="num-md">{{ app.pricingLabel }}</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import StarRating from '@/components/StarRating.vue'
import Icon from '@/components/Icon.vue'

defineProps({ app: { type: Object, required: true } })

const formatted = (n) => n.toLocaleString('en-US')
</script>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: 1fr auto 1.5fr auto 1fr auto 1fr;
  align-items: center;
  gap: 24px;
  padding: 16px 20px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.stat { min-width: 0; }
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
.rating-value { gap: 6px; }
.num {
  font-size: var(--hr-text-xl);
  font-weight: 600;
}
.num-md {
  font-size: var(--hr-text-md);
  font-weight: 500;
}
.muted { color: var(--gray-500); font-size: var(--hr-text-sm); }
.muted-icon { color: var(--gray-500); }
.success-icon { color: var(--success-500); }
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
@media (max-width: 900px) {
  .stats { grid-template-columns: 1fr 1fr; gap: 16px; }
  .divider { display: none; }
}
</style>
