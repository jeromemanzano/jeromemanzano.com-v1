<template>
  <section
    class="flex h-screen w-full p-0 text-7xl md:text-8xl lg:text-[150px] xl:text-[180px] font-extrabold font-sans text-center items-center justify-center overflow-clip"
  >
    <TrailAnimation
      text="JEROME"
      class="absolute top-0 w-full h-[46%] md:h-[44.5%] lg:h-[43%] xl:h-[44%] italic"
    />
    <TrailAnimation
      text="MANZANO"
      placement="top"
      class="absolute bottom-0 w-full h-[54%] md:h-[55.5%] lg:h-[57%] xl:h-[56%] italic"
    />
    <h1
      id="welcome-section"
      class="bg-tranparent text-mainColor italic mx-20 transition from:opacity-0 delay-[800ms] xl:mx-40"
    >
      JEROME MANZANO
      <span
        class="block text-3xl md:text-4xl lg:text-5xl xl:text-7xl not-italic text-secondaryColor -mx-20 font-semibold transition from:opacity-0 from:-translate-y-3 delay-[1500ms] duration-500"
        >Cross-platform developer</span
      >
    </h1>
  </section>
</template>

<script setup lang="ts">
import TrailAnimation from '@/components/TrailAnimation.vue'
</script>
