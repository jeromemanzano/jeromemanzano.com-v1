<template>
  <div>
    <div
      class="flex not-active:hover:drop-shadow-[-5px_0.5px_0_rgba(0,240,255,1)]"
      :class="{ active: active }"
    >
      <a
        :href="href"
        class="grow not-active:hover:translate-x-1 not-active:hover:-translate-y-1"
        :data-text="text"
        :class="{ active: active }"
        >{{ text }}</a
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: String,
  href: String,
  active: Boolean,
})
</script>

<style scoped>
a,
a::after {
  @apply bg-mainColor;
  @apply text-contentTextColor;
  padding: 0.5rem;
  font: inherit;
  border: 0;
  letter-spacing: 3px;
  position: relative;
  clip-path: polygon(100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 0);
  white-space: pre;
  top: 0;
  bottom: 0;
}

a.active,
a.active::after {
  @apply bg-contentActiveBgColor;
  @apply text-textColor;
}

a::after {
  --slice-0: inset(50% 50% 50% 50%);
  --slice-1: inset(80% -6px 0 0);
  --slice-2: inset(50% -6px 30% 0);
  --slice-3: inset(10% -6px 85% 0);
  --slice-4: inset(40% -6px 43% 0);
  --slice-5: inset(80% -6px 5% 0);

  content: attr(data-text);
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  clip-path: var(--slice-0);
}

a.active::after {
  animation: 1s glitch infinite;
  animation-timing-function: steps(2, end);
}

@keyframes glitch {
  0% {
    clip-path: var(--slice-1);
    transform: translate(-20px, -10px);
  }
  10% {
    clip-path: var(--slice-3);
    transform: translate(10px, 10px);
  }
  20% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 10px);
  }
  30% {
    clip-path: var(--slice-3);
    transform: translate(0px, 5px);
  }
  40% {
    clip-path: var(--slice-2);
    transform: translate(-5px, 0px);
  }
  50% {
    clip-path: var(--slice-3);
    transform: translate(5px, 0px);
  }
  60% {
    clip-path: var(--slice-4);
    transform: translate(5px, 10px);
  }
  70% {
    clip-path: var(--slice-2);
    transform: translate(-10px, 10px);
  }
  80% {
    clip-path: var(--slice-5);
    transform: translate(20px, -10px);
  }
  90% {
    clip-path: var(--slice-1);
    transform: translate(-10px, 0px);
  }
  100% {
    clip-path: var(--slice-1);
    transform: translate(0);
  }
}
</style>

<!-- reference https://codepen.io/stevenlei/pen/ZEpyBod -->
