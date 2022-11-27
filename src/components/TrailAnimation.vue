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
      v-for="(items, index) in trails"
      :key="index"
      class="opacity-0 px-4 relative font-extrabold text-mainBgColor overflow-hidden last:overflow-visible [&:nth-child(1)]:md:hidden [&:nth-child(2)]:md:hidden [&:nth-child(3)]:lg:hidden"
      :style="items.style"
    >
      {{ text }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

const startAnimation = ref(false)

const props = withDefaults(
  defineProps<{
    text: string
    placement?: string
  }>(),
  {
    placement: 'bottom',
  }
)

const trails = computed(() => [
  {
    class: `${props.placement}-[90%] md:hidden`,
    style: '-webkit-text-stroke: 1px #7acbc3',
  },
  {
    class: `${props.placement}-[80%] md:hidden`,
    style: '-webkit-text-stroke: 1px #7acbc3',
  },
  {
    class: `${props.placement}-[70%] md:${props.placement}-[85%] lg:${props.placement}-[70%] xl:${props.placement}-[60%]`,
    style: '-webkit-text-stroke: 1px #7acbc3',
  },
  {
    class: `${props.placement}-[60%] md:${props.placement}-[70%] lg:${props.placement}-[60%] xl:${props.placement}-[50%]`,
    style: '-webkit-text-stroke: 1px #7eafcd',
  },
  {
    class: `${props.placement}-[45%] md:${props.placement}-[55%] lg:${props.placement}-[50%] xl:${props.placement}-[40%]`,
    style: '-webkit-text-stroke: 1px #7eafcd',
  },
  {
    class: `${props.placement}-[30%] md:${props.placement}-[40%] xl:${props.placement}-[30%]`,
    style: '-webkit-text-stroke: 1px #99a4c9',
  },
  {
    class: `${props.placement}-[15%] md:${props.placement}-[20%] xl:${props.placement}-[25%]`,
    style: '-webkit-text-stroke: 1px #954b65',
  },
  {
    class: `${props.placement}-0`,
    style: '-webkit-text-stroke: 1px #954b65',
  },
])

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
