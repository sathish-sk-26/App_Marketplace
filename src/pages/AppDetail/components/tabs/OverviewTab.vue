<template>
  <div class="overview">
    <!-- Media gallery: large preview + 2 small previews -->
    <section class="media">
      <button class="media-main" @click="playing = true" aria-label="Play product tour video">
        <template v-if="!playing">
          <img :src="app.media.video.poster" alt="" />
          <span class="play"><Icon name="play" :size="22" /></span>
          <span class="media-title">{{ app.media.video.title }}</span>
        </template>
        <iframe
          v-else
          :src="app.media.video.url"
          title="Product tour video"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        />
      </button>
      <div class="media-side">
        <img v-for="(src, i) in app.media.images" :key="i" :src="src" :alt="`Screenshot ${i + 1}`" />
      </div>
    </section>

    <!-- About -->
    <section class="block">
      <h3 class="kicker">ABOUT</h3>
      <p class="lead">{{ app.about.description }}</p>
      <ul class="bullets">
        <li v-for="b in app.about.bullets" :key="b">
          <span class="bullet-check"><Icon name="check" :size="12" /></span>
          {{ b }}
        </li>
      </ul>
      <div class="tags">
        <span v-for="t in app.about.tags" :key="t" class="tag">{{ t }}</span>
      </div>
    </section>

    <hr class="rule" />

    <!-- Works with -->
    <section class="block">
      <div class="works-head">
        <h3 class="kicker">WORKS WITH</h3>
        <span class="muted">{{ app.worksWith.total }} integrations</span>
      </div>
      <div class="integrations">
        <div v-for="i in app.worksWith.items" :key="i.name" class="integration">
          <span class="i-icon" :style="{ background: i.color }">{{ i.letter }}</span>
          <span>{{ i.name }}</span>
        </div>
        <button class="integration more">+ {{ app.worksWith.extra.toLocaleString() }} more</button>
      </div>
    </section>

    <hr class="rule" />

    <!-- What's Included -->
    <section class="block">
      <h2 class="section-title">
        <Icon name="package" :size="18" />
        What's Included
      </h2>
      <p class="lead">{{ app.whatsIncluded.description }}</p>

      <div class="sub-title">Custom Js</div>
      <div class="chips">
        <div v-for="c in app.whatsIncluded.customJs" :key="c.name" class="chip">
          <span class="chip-icon" :style="{ background: c.color }" />
          <span>{{ c.name }}</span>
        </div>
      </div>

      <div class="sub-title">Snapshots</div>
      <div class="chips">
        <div v-for="s in app.whatsIncluded.snapshots" :key="s.name" class="chip">
          <span class="chip-icon" :style="{ background: s.color }" />
          <span>{{ s.name }}</span>
          <Icon name="help" :size="14" class="chip-help" />
        </div>
      </div>
    </section>

    <hr class="rule" />

    <!-- Other Apps -->
    <section class="block">
      <h2 class="section-title">
        <Icon name="image" :size="18" />
        Other Apps From {Same Developer}
      </h2>
      <div class="other-apps">
        <a v-for="o in app.otherApps" :key="o.name" class="app-card" href="#">
          <span class="app-card-icon" :style="{ background: o.color }">{{ o.letter }}</span>
          <div class="app-card-meta">
            <div class="app-card-name">{{ o.name }}</div>
            <div class="app-card-cat">{{ o.category }}</div>
          </div>
        </a>
      </div>
    </section>

    <hr class="rule" />

    <!-- Info Grid: Categories, Type, Resources -->
    <section class="info-grid">
      <div class="info-block">
        <h3 class="block-title">Categories</h3>
        <ul class="list">
          <li v-for="c in app.sidebar.categories" :key="c">
            <Icon name="user" :size="16" />
            <span>{{ c }}</span>
          </li>
        </ul>
      </div>

      <div class="info-block">
        <h3 class="block-title">Type</h3>
        <ul class="list">
          <li>
            <Icon name="checkCircle" :size="16" />
            <span>{{ app.sidebar.type }}</span>
          </li>
        </ul>
      </div>

      <div class="info-block">
        <h3 class="block-title">Resources</h3>
        <ul class="list">
          <li v-for="r in app.sidebar.resources" :key="r.name">
            <a :href="r.href" class="resource-link">
              <Icon :name="iconFor(r.icon)" :size="16" />
              <span>{{ r.name }}</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'

defineProps({ app: { type: Object, required: true } })
const playing = ref(false)

function iconFor(key) {
  return ({
    support:    'help',
    docs:       'book',
    terms:      'fileText',
    privacy:    'shield',
    globe:      'globe'
  })[key] || 'globe'
}
</script>

<style scoped>
.overview { display: flex; flex-direction: column; gap: 32px; }

/* Media */
.media {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}
.media-main {
  position: relative; aspect-ratio: 16 / 9;
  border: 0; padding: 0; overflow: hidden;
  border-radius: var(--radius-lg);
  background: #000;
  cursor: pointer;
}
.media-main img { width: 100%; height: 100%; object-fit: cover; }
.media-main iframe { width: 100%; height: 100%; border: 0; }
.media-main .play {
  position: absolute; inset: 0; margin: auto;
  width: 56px; height: 56px; border-radius: 50%;
  background: var(--error-500); color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  pointer-events: none;
}
.media-title {
  position: absolute; top: 16px; inset-inline-start: 16px;
  color: #fff; font-weight: 600; font-size: var(--hr-text-md);
  text-shadow: 0 1px 2px rgba(0,0,0,.6);
}
.media-side { display: grid; grid-template-rows: 1fr 1fr; gap: 16px; }
.media-side img {
  width: 100%; height: 100%; object-fit: cover;
  border-radius: var(--radius-lg);
  aspect-ratio: 4 / 3;
}

/* Sections */
.kicker {
  font-size: var(--hr-text-xs); font-weight: 600;
  letter-spacing: 0.08em; color: var(--gray-500);
  margin: 0 0 12px;
}
.lead {
  margin: 0 0 16px;
  font-size: var(--hr-text-md);
  color: var(--gray-700);
  line-height: 1.6;
}
.bullets { margin: 0 0 16px; padding: 0; list-style: none; }
.bullets li {
  display: flex; align-items: flex-start; gap: 10px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
  padding: 6px 0;
}
.bullet-check {
  width: 18px; height: 18px; border-radius: 50%;
  background: var(--success-50); color: var(--success-600);
  display: inline-flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 1px;
}
.tags { display: flex; flex-wrap: wrap; gap: 8px; }
.tag {
  font-size: var(--hr-text-xs);
  padding: 4px 10px; border-radius: 999px;
  background: var(--gray-50); border: 1px solid var(--gray-200);
  color: var(--gray-700);
}

.rule { border: 0; border-top: 1px solid var(--border); margin: 0; }

.works-head {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 16px;
}
.works-head .kicker { margin: 0; }
.muted { color: var(--gray-500); font-size: var(--hr-text-sm); }
.integrations { display: flex; flex-wrap: wrap; gap: 8px; }
.integration {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 999px;
  padding: 4px 12px 4px 4px;
  font-size: var(--hr-text-sm); color: var(--gray-800);
}
.i-icon {
  width: 22px; height: 22px; border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-size: 11px; font-weight: 700;
}
.integration.more {
  padding: 6px 12px;
  background: var(--gray-50); color: var(--gray-700);
  cursor: pointer; border: 1px dashed var(--gray-300);
}

.section-title {
  margin: 0 0 12px;
  display: inline-flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-xl);
  font-weight: 600; color: var(--gray-900);
}
.sub-title {
  margin: 16px 0 8px;
  font-size: var(--hr-text-sm); font-weight: 600;
  color: var(--gray-900);
}
.chips { display: flex; flex-wrap: wrap; gap: 12px; }
.chip {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 8px 14px; border: 1px solid var(--border);
  border-radius: var(--radius-md);
  font-size: var(--hr-text-sm); color: var(--gray-800);
  background: var(--surface);
}
.chip-icon { width: 20px; height: 20px; border-radius: 50%; }
.chip-help { color: var(--gray-400); margin-inline-start: 4px; }

.other-apps {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}
.app-card {
  display: flex; flex-direction: column; gap: 10px;
  text-decoration: none;
}
.app-card-icon {
  width: 64px; height: 64px; border-radius: var(--radius-lg);
  display: inline-flex; align-items: center; justify-content: center;
  color: #fff; font-weight: 700; font-size: 22px;
  box-shadow: var(--shadow-xs);
}
.app-card-name {
  font-size: var(--hr-text-sm); font-weight: 600;
  color: var(--gray-900);
}
.app-card-cat {
  font-size: var(--hr-text-xs); color: var(--gray-500);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}
.info-block {}
.block-title {
  margin: 0 0 12px;
  font-size: var(--hr-text-md);
  font-weight: 600;
  color: var(--gray-900);
}
.list {
  list-style: none; margin: 0; padding: 0;
  display: flex; flex-direction: column; gap: 10px;
}
.list li {
  display: flex; align-items: center; gap: 8px;
  font-size: var(--hr-text-sm);
  color: var(--gray-700);
}
.resource-link {
  display: inline-flex; align-items: center; gap: 8px;
  color: var(--gray-700);
}
.resource-link:hover { color: var(--primary-600); }

@media (max-width: 720px) {
  .media { grid-template-columns: 1fr; }
  .media-side { grid-template-columns: 1fr 1fr; grid-template-rows: auto; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>
