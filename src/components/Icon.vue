<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <component :is="paths[name]" v-if="paths[name]" />
  </svg>
</template>

<script setup>
import { h } from 'vue'

defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 18 }
})

const P = (d) => () => h('path', { d })
const C = (cx, cy, r) => () => h('circle', { cx, cy, r })

const paths = {
  bag:        P('M6 7h12l-1 13H7L6 7zM9 7V5a3 3 0 0 1 6 0v2'),
  bell:       P('M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0'),
  help:       () => h('g', [h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3' }), h('path', { d: 'M12 17h.01' })]),
  arrowLeft:  P('M19 12H5M12 19l-7-7 7-7'),
  arrowDown:  P('M6 9l6 6 6-6'),
  check:      P('M20 6L9 17l-5-5'),
  checkCircle: () => h('g', [h('circle', { cx: 12, cy: 12, r: 10 }), h('path', { d: 'M8 12l3 3 5-6' })]),
  badgeCheck: () => h('g', [h('circle', { cx: 12, cy: 12, r: 9, fill: 'currentColor', opacity: 0.1 }), h('circle', { cx: 12, cy: 12, r: 9 }), h('path', { d: 'M9 12l2 2 4-4' })]),
  download:   P('M12 3v12M7 10l5 5 5-5M5 21h14'),
  more:       () => h('g', [C(5, 12, 1.5), C(12, 12, 1.5), C(19, 12, 1.5)]),
  star:       P('M12 2l3 7 7 .9-5 4.9 1.5 7L12 18l-6.5 3.8L7 14.8l-5-4.9 7-.9z'),
  user:       () => h('g', [h('path', { d: 'M20 21a8 8 0 1 0-16 0' }), C(12, 7, 4)]),
  shield:     P('M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6z'),
  globe:      () => h('g', [C(12, 12, 10), h('path', { d: 'M2 12h20M12 2a15 15 0 0 1 0 20a15 15 0 0 1 0-20' })]),
  book:       P('M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4V4zM4 16a4 4 0 0 1 4-4h11'),
  fileText:   () => h('g', [h('path', { d: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' }), h('path', { d: 'M14 2v6h6M8 13h8M8 17h8M8 9h2' })]),
  lock:       () => h('g', [h('rect', { x: 3, y: 11, width: 18, height: 11, rx: 2 }), h('path', { d: 'M7 11V7a5 5 0 0 1 10 0v4' })]),
  package:    P('M21 16V8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9'),
  image:      () => h('g', [h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }), C(8.5, 8.5, 1.5), h('path', { d: 'M21 15l-5-5L5 21' })]),
  play:       P('M8 5v14l11-7z'),
  external:   P('M14 3h7v7M10 14L21 3M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6'),
  search:     () => h('g', [C(11, 11, 7), h('path', { d: 'M21 21l-4.3-4.3' })]),
  filter:     P('M3 5h18M6 12h12M10 19h4'),
  chevronDown: P('M6 9l6 6 6-6'),
  sparkles:    () => h('g', [h('path', { d: 'M12 3v6M12 15v6M3 12h6M15 12h6' }), h('circle', { cx: 12, cy: 12, r: 2 })]),
  ai:          () => h('g', [h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }), h('path', { d: 'M9 9h6M9 12h6M9 15h3' })]),
  thumbsUp:    P('M14 10h4.764a2 2 0 0 1 1.789 2.894l-3.646 7.292A2 2 0 0 1 15.118 21H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h2.18a2 2 0 0 0 1.561-.748l1.813-1.974A2 2 0 0 1 12.262 6h1.738a2 2 0 0 1 2 2v2M9 21v-7m4-11v11'),
  thumbsDown:  P('M10 14H5.236a2 2 0 0 0-1.789 2.894l3.646 7.292A2 2 0 0 0 8.882 21h9.118a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-2.18a2 2 0 0 1-1.561-.748l-1.813-1.974A2 2 0 0 0 11.738 6h-1.738a2 2 0 0 0-2 2v2m5 7v7m-4-11V3'),
  building:    P('M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v4M12 10v4M16 10v4'),
  x:           P('M18 6L6 18M6 6l12 12'),
  users:       () => h('g', [h('path', { d: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' }), h('circle', { cx: 9, cy: 7, r: 4 }), h('path', { d: 'M23 21v-2a4 4 0 0 0-3-3.87' }), h('path', { d: 'M16 3.13a4 4 0 0 1 0 7.75' })])
}
</script>
