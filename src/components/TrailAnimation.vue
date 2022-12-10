<template>
  <ul
    aria-hidden="true"
    class="staggered flex items-center justify-end"
    :class="{
      bottom: placement === 'bottom',
      animate: startAnimation,
      'flex-col': placement === 'bottom',
      'flex-col-reverse': placement !== 'bottom',
    }"
  >
    <li
      v-for="(item, index) in trails"
      :key="index"
      class="opacity-0 px-4 relative font-extrabold text-neutral-900 overflow-hidden last:overflow-visible"
      :style="item"
    >
      {{ text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const startAnimation = ref(false)

withDefaults(
  defineProps<{
    text: string
    placement?: string
  }>(),
  {
    placement: 'bottom',
  }
)
const trails = [
  '-webkit-text-stroke: 1px #7acbc3',
  '-webkit-text-stroke: 1px #7acbc3',
  '-webkit-text-stroke: 1px #7acbc3',
  '-webkit-text-stroke: 1px #7eafcd',
  '-webkit-text-stroke: 1px #7eafcd',
  '-webkit-text-stroke: 1px #99a4c9',
  '-webkit-text-stroke: 1px #99a4c9',
  '-webkit-text-stroke: 1px #954b65',
]

onMounted(() => {
  startAnimation.value = true
})
</script>

<style scoped>
.animate > li {
  animation-name: fade-in;
  animation-duration: 1200ms;
  animation-direction: alternate;
}

.animate > li:last-child {
  animation-fill-mode: forwards;
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
}
</style>
