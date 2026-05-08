<template>
  <div class="pricing">
    <div class="pricing-header">
      <div>
        <div class="title-with-badge">
          <h2 class="section-title">Pricing Plans</h2>
          <Tag v-if="app.pricing.trialNote" size="lg" primary icon="">{{ app.pricing.trialNote }}</Tag>
        </div>
      </div>
      <div class="billing-toggle">
        <span :class="{ active: billingPeriod === 'monthly' }">Monthly</span>
        <button class="toggle-btn lg" @click="billingPeriod = billingPeriod === 'monthly' ? 'yearly' : 'monthly'">
          <span class="toggle-slider" :style="{ marginRight: billingPeriod === 'monthly' ? '20px' : '0px' }"></span>
        </button>
        <div class="yearly-container">
          <span :class="{ active: billingPeriod === 'yearly' }">Yearly</span>
          <Tag size="lg" active icon="">Save 12%</Tag>
        </div>
      </div>
    </div>

    <div class="plans-wrapper">
      <button v-if="canScrollLeft" class="scroll-btn scroll-btn-left" @click="scrollPlans('left')">
        <Icon name="chevronLeft" :size="20" />
      </button>

      <div class="plans-container" ref="plansContainer">
        <div class="plans">
          <article
            v-for="p in app.pricing.plans"
            :key="p.name"
            class="plan"
            :class="{ highlight: p.highlighted }"
          >
            <div v-if="p.highlighted" class="ribbon">Most popular</div>
            <div class="plan-header">
              <h3>{{ p.name }}</h3>
              <span v-if="p.label" class="plan-label">{{ p.label }}</span>
            </div>
            <div class="price">
              <span class="amount">{{ p.price }}</span>
              <span v-if="p.period" class="period">{{ billingPeriod === 'monthly' ? p.period : '/ year' }}</span>
              <Tag v-if="billingPeriod === 'yearly' && p.period" size="md" active icon="">Save 12%</Tag>
            </div>
            <p v-if="p.subtext || p.subtextMonthly" class="subtext">
              {{ p.subtext || (billingPeriod === 'monthly' ? p.subtextMonthly : p.subtextYearly) }}
            </p>
            <ul>
              <li v-for="f in p.features" :key="f">
                <Icon name="check" :size="14" />
                <span>{{ f }}</span>
              </li>
            </ul>
            <button class="btn" :class="p.highlighted ? 'btn-primary' : 'btn-secondary'">
              {{ p.highlighted ? 'Get started' : 'Choose plan' }}
            </button>
          </article>
        </div>
      </div>

      <button v-if="canScrollRight" class="scroll-btn scroll-btn-right" @click="scrollPlans('right')">
        <Icon name="chevronRight" :size="20" />
      </button>
    </div>

    <section v-if="app.pricing.usageBased && app.pricing.usageBased.length" class="usage-section">
      <h3 class="usage-title">App also includes usage based pricing</h3>
      <div class="usage-grid">
        <div v-for="(item, i) in app.pricing.usageBased" :key="i" class="usage-card">
          <div class="usage-icon">
            <Icon name="fileText" :size="20" />
          </div>
          <div class="usage-meta">
            <div class="usage-price">{{ item.price }}</div>
            <div class="usage-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Icon from '@/components/Icon.vue'
import Tag from '@/components/Tag.vue'

defineProps({ app: { type: Object, required: true } })

const billingPeriod = ref('monthly')
const plansContainer = ref(null)
const usageContainer = ref(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const canScrollUsageLeft = ref(false)
const canScrollUsageRight = ref(true)
const currentPlansPage = ref(0)
const plansPages = ref([])
const currentUsagePage = ref(0)
const usagePages = ref([])

function scrollPlans(direction) {
  if (!plansContainer.value) return
  const container = plansContainer.value
  const scrollAmount = 320 // Width of one plan card + gap

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  updateScrollButtons()
}

function scrollUsage(direction) {
  if (!usageContainer.value) return
  const container = usageContainer.value
  const scrollAmount = 256 // Width of one usage card + gap

  if (direction === 'left') {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  } else {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  updateUsageScrollButtons()
}

function scrollToPlansPage(pageIndex) {
  if (!plansContainer.value) return
  const container = plansContainer.value
  const scrollAmount = 320 * pageIndex
  container.scrollTo({ left: scrollAmount, behavior: 'smooth' })
}

function scrollToUsagePage(pageIndex) {
  if (!usageContainer.value) return
  const container = usageContainer.value
  const scrollAmount = 256 * pageIndex
  container.scrollTo({ left: scrollAmount, behavior: 'smooth' })
}

function updateScrollButtons() {
  if (!plansContainer.value) return
  const container = plansContainer.value
  canScrollLeft.value = container.scrollLeft > 0
  canScrollRight.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 10

  // Update current page based on scroll position
  const cardWidth = 320
  const pages = Math.ceil(container.scrollWidth / cardWidth)
  plansPages.value = Array.from({ length: pages }, (_, i) => i)
  currentPlansPage.value = Math.round(container.scrollLeft / cardWidth)
}

function updateUsageScrollButtons() {
  if (!usageContainer.value) return
  const container = usageContainer.value
  canScrollUsageLeft.value = container.scrollLeft > 0
  canScrollUsageRight.value = container.scrollLeft < container.scrollWidth - container.clientWidth - 10

  // Update current page based on scroll position
  const cardWidth = 256
  const pages = Math.ceil(container.scrollWidth / cardWidth)
  usagePages.value = Array.from({ length: pages }, (_, i) => i)
  currentUsagePage.value = Math.round(container.scrollLeft / cardWidth)
}

onMounted(() => {
  updateScrollButtons()
  updateUsageScrollButtons()

  if (plansContainer.value) {
    plansContainer.value.addEventListener('scroll', updateScrollButtons)
  }

  if (usageContainer.value) {
    usageContainer.value.addEventListener('scroll', updateUsageScrollButtons)
  }
})

onBeforeUnmount(() => {
  if (plansContainer.value) {
    plansContainer.value.removeEventListener('scroll', updateScrollButtons)
  }

  if (usageContainer.value) {
    usageContainer.value.removeEventListener('scroll', updateUsageScrollButtons)
  }
})
</script>

<style scoped>
.pricing {
  display: flex;
  flex-direction: column;
  /* gap: 24px; */
}

.pricing-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.title-with-badge {
  display: flex;
  align-items: center;
  gap: 12px;
}

.section-title { margin: 0; font-size: var(--hr-text-xl); font-weight: 600; }

.lead { margin: 0 0 8px; color: var(--gray-600); }

.billing-toggle {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  gap: 4px;
}

.billing-toggle span {
  font-size: var(--hr-text-sm);
  color: var(--gray-600);
  font-weight: 500;
  padding: 6px 8px;
}

.billing-toggle span.active {
  color: var(--primary-600);
  font-weight: 600;
}

.yearly-container {
  display: flex;
  align-items: center;
  gap: 6px;
}

.toggle-btn {
  display: flex;
  width: 40px;
  height: 20px;
  padding: 2px;
  justify-content: flex-end;
  align-items: center;
  border: none;
  background: var(--color-primary-blue-600, #155EEF);
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.toggle-btn.lg {
  width: 40px;
  height: 20px;
  padding: 2px;
}

.toggle-slider {
  display: block;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-neutral-white-base, #FFF);
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(16, 24, 40, 0.06)) drop-shadow(0 1px 3px rgba(16, 24, 40, 0.10));
  transition: margin-right 0.2s ease;
}

.toggle-btn:hover {
  background: var(--primary-700);
}

.plans-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
}

.scroll-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border);
  border-radius: 4px;
  background: var(--surface);
  color: var(--gray-700);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.scroll-btn:hover {
  background: var(--gray-50);
  border-color: var(--primary-300);
  color: var(--primary-600);
}

.scroll-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.plans-container {
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  flex: 1;
  min-width: 0;
  padding: 12px 0px;
}

.plans-container::-webkit-scrollbar {
  display: none;
}

.plans {
  display: flex;
  gap: 16px;
  min-width: fit-content;
}
.plan {
  position: relative;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 280px;
  flex-shrink: 0;
  overflow: visible;
}
.plan.highlight {
  border-color: var(--primary-500);
  box-shadow: var(--shadow-md);
}
.ribbon {
  position: absolute;
  top: -12px;
  inset-inline-end: 16px;
  background: var(--primary-500);
  color: #fff;
  font-size: var(--hr-text-xs);
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  z-index: 10;
}
.plan-header {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.plan-header h3 {
  margin: 0;
  font-size: var(--hr-text-lg);
}

.plan-label {
  display: inline-flex;
  width: fit-content;
  padding: 4px 10px;
  background: var(--gray-100);
  border-radius: 4px;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  font-weight: 500;
}

.price { display: flex; align-items: center; gap: 8px; }
.amount { font-size: var(--hr-text-3xl); font-weight: 700; }
.period { color: var(--gray-500); font-size: var(--hr-text-sm); }

.subtext {
  margin: 0;
  padding: 8px 12px;
  background: var(--gray-50);
  border-radius: 6px;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  font-weight: 500;
}
.plan ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.plan li { display: flex; gap: 8px; font-size: var(--hr-text-sm); color: var(--gray-700); }
.plan li :deep(svg) { color: var(--success-500); flex-shrink: 0; margin-top: 3px; }

.btn {
  margin-top: auto;
  height: 40px; border-radius: 4px;
  font-weight: 600; font-size: var(--hr-text-sm);
  border: 1px solid transparent;
}
.btn-primary { background: var(--primary-500); color: #fff; }
.btn-primary:hover { background: var(--primary-600); }
.btn-secondary {
  background: var(--surface); color: var(--gray-900);
  border-color: var(--border);
}
.btn-secondary:hover { background: var(--gray-50); }

.usage-section {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.usage-title {
  margin: 0;
  font-size: var(--hr-text-lg);
  font-weight: 700;
  color: var(--gray-900);
}

.usage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.usage-card {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
}
.usage-icon {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--primary-50, #EEF4FF);
  color: var(--primary-600);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.usage-meta { min-width: 0; }
.usage-price {
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
  line-height: 1.3;
}
.usage-label {
  font-size: var(--hr-text-sm);
  color: var(--gray-500);
  line-height: 1.3;
}

</style>
