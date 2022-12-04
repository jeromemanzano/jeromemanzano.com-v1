<template>
  <section
    class="flex flex-col h-screen w-full p-0 text-7xl md:text-8xl lg:text-9xl font-extrabold font-sans text-center items-center justify-center mx-auto overflow-clip"
  >
    <TrailAnimation
      text="JEROME"
      class="absolute top-0 w-full h-[50%] italic"
    />
    <TrailAnimation
      text="MANZANO"
      placement="top"
      class="absolute bottom-0 w-full h-[50%] italic"
    />
    <h1
      id="welcome-section"
      class="bg-tranparent text-mainColor italic transition from:opacity-0 delay-[800ms] mx-auto"
    >
      JEROME<br />
      MANZANO
    </h1>
    <span
      class="relatieve text-2xl md:text-4xl lg:text-5xl not-italic text-secondaryColor -mx-20 font-semibold transition from:opacity-0 from:-translate-y-3 delay-[1500ms] duration-500"
      >Cross-platform developer</span
    >
  </section>
</template>

<script setup lang="ts">
import TrailAnimation from '@/components/TrailAnimation.vue'
</script>
