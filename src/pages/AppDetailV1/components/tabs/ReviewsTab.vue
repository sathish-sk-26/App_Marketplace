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
            <Tag active rounded size="md" icon="">92% recommend this app</Tag>
            <span class="ai-subtext">AI-generated summary</span>
          </div>
          <p class="ai-text">{{ getAISummary() }}</p>

          <div v-if="app.aiTopics" class="ai-topics">
            <button
              v-for="t in app.aiTopics.pros || []"
              :key="`pro-${t}`"
              type="button"
              class="ai-topic ai-topic--pro"
              :class="{ selected: selectedTopics.includes(t) }"
              @click="toggleTopic(t)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              {{ t }}
            </button>
            <button
              v-for="t in app.aiTopics.cons || []"
              :key="`con-${t}`"
              type="button"
              class="ai-topic ai-topic--con"
              :class="{ selected: selectedTopics.includes(t) }"
              @click="toggleTopic(t)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              {{ t }}
            </button>
            <button v-if="selectedTopics.length" type="button" class="ai-topics-clear" @click="clearTopics">
              Clear topics
            </button>
          </div>

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

        <div v-if="getFilteredReviews().length === 0" class="reviews-empty">
          <p>No reviews match the selected topics yet.</p>
          <button v-if="selectedTopics.length" type="button" class="reviews-empty-link" @click="clearTopics">Clear topics</button>
        </div>

        <div v-else class="reviews-list" ref="reviewsListRef">
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

            <p class="review-body" :class="{ truncated: !expanded[idx] }" v-html="highlightBody(review.body)"></p>

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
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M4.93462 1.04099C5.08083 0.712015 5.40707 0.5 5.76708 0.5C6.72415 0.5 7.5 1.27585 7.5 2.23292V4H9.25158C10.4774 4 11.4147 5.0926 11.2283 6.30411L10.6899 9.80412C10.5398 10.7798 9.70026 11.5 8.71312 11.5H2C1.17157 11.5 0.5 10.8284 0.5 10V6.5C0.5 5.67157 1.17157 5 2 5H3.17506L4.93462 1.04099ZM4 10.5H8.71312C9.20669 10.5 9.62644 10.1399 9.70149 9.65206L10.24 6.15206C10.3331 5.5463 9.86447 5 9.25158 5H7.5C6.94772 5 6.5 4.55228 6.5 4V2.23292C6.5 1.84728 6.20216 1.53121 5.82397 1.50218L4.08888 5.40614C4.06385 5.46244 4.03402 5.51563 4 5.56529V10.5ZM3 6V10.5H2C1.72386 10.5 1.5 10.2761 1.5 10V6.5C1.5 6.22386 1.72386 6 2 6H3Z" fill="currentColor"/>
                </svg>
                <span>({{ getHelpfulCount(idx, 'up') }})</span>
              </button>
              <button
                class="helpful-btn"
                :class="{ active: helpful[idx] === 'down' }"
                @click="toggleHelpful(idx, 'down')"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.0156 1.51196C9.87398 1.50039 9.68784 1.5 9.39957 1.5H8.99957V5.99997C9.00629 5.99999 9.01292 6 9.01946 6H9.39957C9.68784 6 9.87398 5.99961 10.0156 5.98804C10.1515 5.97694 10.2018 5.9581 10.2266 5.9455C10.3206 5.89757 10.3971 5.82108 10.4451 5.727C10.4577 5.70227 10.4765 5.65191 10.4876 5.51608C10.4992 5.37441 10.4996 5.18828 10.4996 4.9V2.6C10.4996 2.31172 10.4992 2.12559 10.4876 1.98392C10.4765 1.84809 10.4577 1.79773 10.4451 1.77301C10.3971 1.67893 10.3206 1.60243 10.2266 1.5545C10.2018 1.5419 10.1515 1.52306 10.0156 1.51196ZM7.99957 6.4389V1.5H4.05857C3.68563 1.5 3.43377 1.50034 3.23755 1.51527C3.04759 1.52973 2.94706 1.55591 2.87372 1.58915C2.70033 1.66771 2.55296 1.79414 2.44894 1.95357C2.40494 2.02101 2.36378 2.11639 2.3206 2.30194C2.276 2.4936 2.23737 2.74248 2.18067 3.11109L1.91913 4.81109C1.8445 5.29614 1.79383 5.6284 1.77663 5.88632C1.75975 6.13946 1.78002 6.26823 1.81364 6.35638C1.89635 6.57323 2.05192 6.75456 2.25368 6.86929C2.33569 6.91592 2.45988 6.95554 2.71264 6.97734C2.97018 6.99956 3.30628 7 3.79703 7L4.21551 7C4.3417 6.99998 4.4646 6.99997 4.56868 7.00847C4.68298 7.01781 4.81785 7.03985 4.95356 7.10899C5.14172 7.20487 5.2947 7.35785 5.39057 7.54601C5.45972 7.68172 5.48176 7.81659 5.49109 7.93089C5.4996 8.03497 5.49958 8.15787 5.49957 8.28406L5.49957 9.76708C5.49957 10.1527 5.7974 10.4688 6.1756 10.4978L7.83151 6.77202C7.83675 6.76024 7.84209 6.74809 7.84756 6.73565C7.8874 6.64503 7.93424 6.53851 7.99957 6.4389ZM9.41884 0.5C9.68241 0.499991 9.90979 0.499984 10.0971 0.515286C10.2948 0.531436 10.4914 0.567094 10.6806 0.663491C10.9628 0.807301 11.1923 1.03677 11.3361 1.31902C11.4325 1.5082 11.4681 1.70481 11.4843 1.90249C11.4996 2.08977 11.4996 2.31715 11.4996 2.58072V4.91928C11.4996 5.18285 11.4996 5.41023 11.4843 5.59752C11.4681 5.79519 11.4325 5.9918 11.3361 6.18099C11.1923 6.46323 10.9628 6.6927 10.6806 6.83651C10.4914 6.93291 10.2948 6.96857 10.0971 6.98472C9.90979 7.00002 9.68241 7.00001 9.41883 7H9.01946C8.91909 7 8.86721 7.00024 8.82969 7.00266C8.82854 7.00274 8.82743 7.00281 8.82638 7.00289C8.82588 7.00382 8.82536 7.0048 8.82483 7.00582C8.80738 7.03913 8.78609 7.08643 8.74532 7.17816L7.06494 10.959C6.91873 11.288 6.59249 11.5 6.23249 11.5C5.27542 11.5 4.49957 10.7241 4.49957 9.76708V8.3C4.49957 8.15174 4.49918 8.07061 4.49442 8.01232C4.49423 8.01 4.49403 8.0078 4.49384 8.00573C4.49177 8.00553 4.48957 8.00534 4.48725 8.00515C4.42896 8.00039 4.34783 8 4.19957 8H3.77466C3.31177 8.00001 2.93232 8.00001 2.62668 7.97364C2.31133 7.94643 2.02217 7.88801 1.75938 7.73858C1.35586 7.50913 1.04472 7.14646 0.879297 6.71275C0.771562 6.43029 0.757788 6.13561 0.778847 5.81979C0.799258 5.51369 0.856961 5.13865 0.927352 4.68115L1.19515 2.94045C1.24827 2.59513 1.29238 2.30843 1.34662 2.0753C1.40326 1.8319 1.47839 1.61105 1.61143 1.40714C1.81947 1.08828 2.11421 0.835426 2.46099 0.67829C2.68276 0.577804 2.91246 0.537127 3.16165 0.518158C3.40031 0.49999 3.69038 0.499995 4.03977 0.500001L9.41884 0.5Z" fill="currentColor"/>
                </svg>
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
import Tag from '@/components/Tag.vue'

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
  let result = props.app.reviews
  if (selectedRatings.value.length > 0) {
    result = result.filter(review => selectedRatings.value.includes(review.rating))
  }
  if (selectedTopics.value.length > 0) {
    result = result.filter(review =>
      (review.topics || []).some(t => selectedTopics.value.includes(t))
    )
  }
  return result
}

const selectedTopics = ref([])
const reviewsListRef = ref(null)

function toggleTopic(topic) {
  const i = selectedTopics.value.indexOf(topic)
  if (i > -1) selectedTopics.value.splice(i, 1)
  else selectedTopics.value.push(topic)
  if (selectedTopics.value.length && reviewsListRef.value) {
    setTimeout(() => reviewsListRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }
}
function clearTopics() {
  selectedTopics.value = []
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}
function highlightBody(body) {
  const safe = escapeHtml(body)
  if (!selectedTopics.value.length) return safe
  const pattern = new RegExp(`(${selectedTopics.value.map(escapeRegExp).join('|')})`, 'gi')
  return safe.replace(pattern, '<mark class="topic-hit">$1</mark>')
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
.ai-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ai-based {
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 400;
}
.ai-title {
  margin: 0;
  font-size: var(--hr-text-md);
  font-weight: 700;
  color: var(--color-accent-purple-700, #5925DC);
}
.ai-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ai-subtext {
  margin-left: auto;
  font-size: 12px;
  color: var(--gray-500);
  font-weight: 400;
}
.ai-text {
  margin: 0;
  font-size: var(--hr-text-sm);
  line-height: 1.6;
  color: var(--gray-700);
}
.ai-topics {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
}
.ai-topic {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 8px;
  border-radius: 999px;
  border: 1px solid;
  background: #fff;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}
.ai-topic svg { width: 12px; height: 12px; }
.ai-topic--pro {
  border-color: #6CE9A6;
  color: #027A48;
}
.ai-topic--pro:hover,
.ai-topic--pro.selected { background: #ECFDF3; }
.ai-topic--pro.selected { border-color: #039855; }
.ai-topic--con {
  border-color: #FECDCA;
  color: #B42318;
}
.ai-topic--con:hover,
.ai-topic--con.selected { background: #FEF3F2; }
.ai-topic--con.selected { border-color: #D92D20; }
.ai-topics-clear {
  border: none;
  background: transparent;
  color: var(--gray-600);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  margin-left: 4px;
}
.ai-topics-clear:hover { color: var(--gray-900); text-decoration: underline; }
:deep(.topic-hit) {
  background: var(--color-primary-blue-200, #B2CCFF);
  color: inherit;
  padding: 0 2px;
  border-radius: 2px;
}
.reviews-empty {
  padding: 32px 20px;
  text-align: center;
  border: 1px dashed var(--border);
  border-radius: 8px;
  color: var(--gray-600);
  font-size: var(--hr-text-sm);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.reviews-empty-link {
  border: none;
  background: transparent;
  color: var(--primary-600, #155EEF);
  font-size: var(--hr-text-sm);
  font-weight: 500;
  cursor: pointer;
}
.reviews-empty-link:hover { text-decoration: underline; }

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
  padding: 12px 0 0;
  border-top: 1px solid var(--gray-100);
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
