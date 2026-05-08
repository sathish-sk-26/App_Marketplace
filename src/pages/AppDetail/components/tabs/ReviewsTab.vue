<template>
  <div class="reviews-wrapper">
    <div class="reviews-container">
      <!-- Left sidebar: Rating summary -->
      <aside class="sidebar">
        <div class="rating-card">
          <div class="rating-summary">
            <div class="rating-display">
              <span class="rating-number">{{ app.rating.toFixed(1) }}</span>
              <span class="rating-max">/4</span>
            </div>
            <StarRating :model-value="app.rating" size="md" />
            <p class="rating-note">Based on {{ app.reviewCount.toLocaleString() }} out of 549 reviews</p>
          </div>

          <div class="rating-distribution">
            <div class="dist-items">
              <div
                v-for="stars in [5, 4, 3, 2, 1]"
                :key="`dist-${stars}`"
                class="dist-item"
                @click="toggleRatingFilter(stars)"
              >
                <span class="dist-label">{{ stars }} <Icon name="star" :size="11" class="dist-star" /></span>
                <div class="dist-bar">
                  <div class="dist-fill" :style="{ width: getDistributionWidth(stars) + '%' }" />
                </div>
                <span class="dist-count">{{ getRatingCount(stars).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>

        <button class="btn-write-review">Sign in to write a review</button>
      </aside>

      <!-- Main content: Reviews list -->
      <main class="main">
        <!-- AI Summary Section -->
        <div class="ai-summary-section">
          <div class="ai-header">
            <svg class="ai-icon" xmlns="http://www.w3.org/2000/svg" width="27" height="28" viewBox="0 0 27 28" fill="none">
              <path d="M22.7267 8.39L23.78 6.05667L26.1133 5.00333C26.6333 4.76333 26.6333 4.03 26.1133 3.79L23.78 2.73667L22.7267 0.39C22.4867 -0.13 21.7533 -0.13 21.5133 0.39L20.46 2.72333L18.1133 3.77667C17.5933 4.01667 17.5933 4.75 18.1133 4.99L20.4467 6.04333L21.5 8.39C21.74 8.91 22.4867 8.91 22.7267 8.39ZM12.1133 10.39L9.99333 5.72333C9.52667 4.68333 8.03333 4.68333 7.56667 5.72333L5.44667 10.39L0.78 12.51C-0.26 12.99 -0.26 14.47 0.78 14.9367L5.44667 17.0567L7.56667 21.7233C8.04667 22.7633 9.52667 22.7633 9.99333 21.7233L12.1133 17.0567L16.78 14.9367C17.82 14.4567 17.82 12.9767 16.78 12.51L12.1133 10.39ZM21.5 19.0567L20.4467 21.39L18.1133 22.4433C17.5933 22.6833 17.5933 23.4167 18.1133 23.6567L20.4467 24.71L21.5 27.0567C21.74 27.5767 22.4733 27.5767 22.7133 27.0567L23.7667 24.7233L26.1133 23.67C26.6333 23.43 26.6333 22.6967 26.1133 22.4567L23.78 21.4033L22.7267 19.0567C22.4867 18.5367 21.74 18.5367 21.5 19.0567Z" fill="url(#paint0_linear_6892_24513)"/>
              <defs>
                <linearGradient id="paint0_linear_6892_24513" x1="13.2517" y1="0" x2="13.2517" y2="27.4467" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#9B8AFB"/>
                  <stop offset="1" stop-color="#3E1C96"/>
                </linearGradient>
              </defs>
            </svg>
            <h3 class="ai-title">What customers think</h3>
          </div>
          <p class="ai-text">{{ getAISummary() }}</p>
        </div>

        <!-- Reviews Toolbar with Count and Filters -->
        <div class="reviews-toolbar">
          <p class="reviews-count">Showing {{ getFilteredReviews().length }} reviews</p>

          <div class="chips-container">
            <FilterDropdown
              ref="filterDropdownRef"
              :options="filterOptions"
              :model-value="selectedRatings"
              @update:model-value="selectedRatings = $event"
              @clear="clearAllFilters"
              @open="sortChipRef?.closeMenu()"
            />

            <SortChip
              ref="sortChipRef"
              :options="sortOptions"
              :model-value="sortBy"
              @update:model-value="sortBy = $event"
              @open="filterDropdownRef?.closeMenu()"
            />
          </div>
        </div>

        <div class="reviews-list">
          <article v-for="(review, idx) in getFilteredReviews()" :key="idx" class="review-card">
            <div class="review-header">
              <div class="reviewer-section">
                <div class="reviewer-avatar" :style="{ background: getAvatarColor(idx) }">
                  {{ getInitials(review.name) }}
                </div>
                <div class="reviewer-details">
                  <div class="reviewer-name">{{ review.name }}</div>
                  <div class="review-meta">
                    <StarRating :model-value="review.rating" size="sm" />
                    <span class="review-date">Posted on {{ formatDate(review.date) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="review-body" :class="{ truncated: !expanded[idx] }">{{ review.body }}</p>

            <button v-if="review.body.length > 200" class="show-toggle" @click="expanded[idx] = !expanded[idx]">
              {{ expanded[idx] ? 'Show less' : 'Show more' }}
            </button>

            <div class="review-actions">
              <span class="helpful-label">Was this review helpful?</span>
              <button
                class="helpful-btn"
                :class="{ active: helpful[idx] === 'up' }"
                @click="toggleHelpful(idx, 'up')"
              >
                <Icon name="thumbsUp" :size="14" />
                <span>({{ getHelpfulCount(idx, 'up') }})</span>
              </button>
              <button
                class="helpful-btn"
                :class="{ active: helpful[idx] === 'down' }"
                @click="toggleHelpful(idx, 'down')"
              >
                <Icon name="thumbsDown" :size="14" />
                <span>({{ getHelpfulCount(idx, 'down') }})</span>
              </button>
              <span class="separator">·</span>
            </div>

            <div v-if="review.response" class="developer-response">
              <div class="response-header">
                <div class="dev-avatar">{{ getDeveloperInitials() }}</div>
                <div class="dev-info">
                  <div class="dev-name">{{ getDeveloperName() }}</div>
                </div>
              </div>
              <p class="response-body">{{ review.response.text }}</p>
            </div>
          </article>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import StarRating from '@/components/StarRating.vue'
import Icon from '@/components/Icon.vue'
import FilterDropdown from '@/components/FilterDropdown.vue'
import SortChip from '@/components/SortChip.vue'

const props = defineProps({ app: { type: Object, required: true } })

const filterDropdownRef = ref(null)
const sortChipRef = ref(null)
const expanded = ref({})
const helpful = ref({})
const sortBy = ref('Newest')
const sortOptions = ['Newest', 'Oldest', 'Highest rated', 'Lowest rated', 'Most helpful']
const selectedRatings = ref([])
const ratingCounts = ref({
  5: 4293,
  4: 671,
  3: 165,
  2: 70,
  1: 142
})

const filterOptions = ref([
  { value: 1, label: '1', count: 142 },
  { value: 2, label: '2', count: 70 },
  { value: 3, label: '3', count: 165 },
  { value: 4, label: '4', count: 671 },
  { value: 5, label: '5', count: 4293 }
])
const helpfulCounts = ref({
  up: { 0: 245, 1: 89, 2: 12 },
  down: { 0: 34, 1: 156, 2: 3 }
})

const avatarColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8']

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function getAvatarColor(idx) {
  return avatarColors[idx % avatarColors.length]
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function toggleHelpful(idx, type) {
  if (helpful.value[idx] === type) {
    helpful.value[idx] = null
  } else {
    helpful.value[idx] = type
  }
}

function getHelpfulCount(idx, type) {
  return helpfulCounts.value[type][idx] || 0
}

function getDeveloperInitials() {
  return 'RC'
}

function getDeveloperName() {
  return props.app.name
}

function getAISummary() {
  return "Based on customer feedback, users highly appreciate the app's reliability and ease of use. The platform excels in providing excellent support and seamless integration capabilities with external services. Key strengths include intuitive configuration, strong documentation, and responsive customer success teams. Some users note challenges during onboarding for complex setups, but overall satisfaction remains high due to consistent performance and continuous improvements."
}

function getRatingCount(stars) {
  return ratingCounts.value[stars] || 0
}

function getDistributionWidth(stars) {
  const total = Object.values(ratingCounts.value).reduce((a, b) => a + b, 0)
  return (getRatingCount(stars) / total) * 100
}

function toggleRatingFilter(stars) {
  // Distribution bar click: single-select (replaces previous selection)
  selectedRatings.value = [stars]
}

function clearAllFilters() {
  selectedRatings.value = []
}

function getFilteredReviews() {
  if (selectedRatings.value.length === 0) {
    return props.app.reviews
  }
  return props.app.reviews.filter(review => selectedRatings.value.includes(review.rating))
}
</script>

<style scoped>
.reviews-wrapper {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Container layout */
.reviews-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 200px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.rating-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  background: var(--surface);
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.rating-summary {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.rating-display {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 2px;
}
.rating-number {
  font-size: 36px;
  font-weight: 700;
  color: var(--gray-900);
}
.rating-max {
  font-size: var(--hr-text-md);
  color: var(--gray-500);
}
.rating-note {
  margin: 0;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  line-height: 1.4;
}

.btn-write-review {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--primary-600);
  font-size: var(--hr-text-sm);
  font-weight: 600;
  cursor: pointer;
  transition: all .2s ease;
}
.btn-write-review:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
}

/* Rating Distribution */
.rating-distribution {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--gray-100);
}
.dist-items {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 12px;
}
.dist-item {
  display: grid;
  grid-template-columns: 30px 1fr 45px;
  align-items: center;
  gap: 8px;
  padding: 6px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  cursor: pointer;
  transition: all .2s ease;
}
.dist-item:hover {
  background: var(--gray-50);
  border-color: var(--gray-200);
}
.dist-item.active {
  background: var(--primary-50);
  border-color: var(--primary-300);
}
.dist-label {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: var(--hr-text-xs);
  font-weight: 500;
  color: var(--gray-700);
  white-space: nowrap;
}
.dist-star {
  color: var(--gray-400);
}
.dist-bar {
  height: 6px;
  background: var(--gray-200);
  border-radius: 3px;
  overflow: hidden;
}
.dist-fill {
  height: 100%;
  background: var(--primary-500);
  border-radius: 3px;
  transition: width .2s ease;
}
.dist-count {
  text-align: right;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  font-weight: 500;
}
.clear-filter-btn {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--gray-50);
  color: var(--gray-700);
  font-size: var(--hr-text-xs);
  font-weight: 500;
  cursor: pointer;
  transition: all .2s ease;
}
.clear-filter-btn:hover {
  border-color: var(--primary-300);
  background: var(--primary-50);
  color: var(--primary-600);
}

/* Main content */
.main {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Reviews Toolbar */
.reviews-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  /* padding-bottom: 12px; */
  /* border-bottom: 1px solid var(--border); */
}
.reviews-count {
  margin: 0;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  flex-shrink: 0;
}
.chips-container {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

/* AI Summary Section */
.ai-summary-section {
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid var(--color-accent-purple-300, #BDB4FE);
}
.ai-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}
.ai-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
}
.ai-title {
  margin: 0;
  font-size: var(--hr-text-md);
  font-weight: 700;
  color: var(--color-accent-purple-700, #5925DC);
}
.ai-text {
  margin: 0;
  font-size: var(--hr-text-sm);
  line-height: 1.6;
  color: var(--gray-700);
}

/* Reviews list */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: 16px;
  background: var(--surface);
}

.review-header {
  margin-bottom: 12px;
}
.reviewer-section {
  display: flex;
  gap: 12px;
}
.reviewer-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--hr-text-xs);
  font-weight: 700;
  flex-shrink: 0;
}
.reviewer-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}
.reviewer-name {
  font-size: var(--hr-text-sm);
  font-weight: 600;
  color: var(--gray-900);
}
.review-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
}
.review-date {
  display: inline-flex;
}

.review-body {
  margin: 0 0 8px;
  font-size: var(--hr-text-sm);
  line-height: 1.6;
  color: var(--gray-700);
}
.review-body.truncated {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.show-toggle {
  padding: 0;
  border: none;
  background: transparent;
  color: var(--primary-600);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 8px;
}
.show-toggle:hover { color: var(--primary-700); }

/* Helpful votes */
.review-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: var(--hr-text-xs);
  color: var(--gray-600);
  padding: 8px 0;
  border-top: 1px solid var(--gray-100);
  border-bottom: 1px solid var(--gray-100);
}
.helpful-label {
  font-weight: 500;
}
.helpful-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--gray-600);
  cursor: pointer;
  font-size: var(--hr-text-xs);
  transition: color .2s ease;
}
.helpful-btn:hover { color: var(--gray-800); }
.helpful-btn.active { color: var(--primary-600); font-weight: 600; }
.separator { opacity: 0.3; }

/* Developer response */
.developer-response {
  margin-top: 12px;
  padding: 12px;
  background: var(--gray-50);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-500);
}
.response-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}
.dev-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary-500);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--hr-text-2xs);
  font-weight: 700;
  flex-shrink: 0;
}
.dev-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.dev-name {
  font-size: var(--hr-text-xs);
  font-weight: 600;
  color: var(--gray-900);
}
.response-body {
  margin: 0;
  font-size: var(--hr-text-xs);
  line-height: 1.6;
  color: var(--gray-700);
}

@media (max-width: 900px) {
  .reviews-container {
    grid-template-columns: 1fr;
  }
  .sidebar {
    position: relative;
    top: auto;
  }
  .reviews-toolbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>
