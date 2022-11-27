<template>
  <section class="h-screen flex flex-col justify-center">
    <h2
      id="contact-section"
      class="transition"
    >
      Contact me
    </h2>
    <p class="font-roboto transition from:opacity-0 duration-500 max-w-3xl mx-auto text-2xl md:text-4xl">
      If you&#39;re looking for someone to help you build your vision, then please get in touch – I&#39;d love to hear
      from you!
    </p>

    <a
      class="neon text-lg md:text-2xl px-6 py-4 border-2 rounded-lg border-borderColor hover:border-activeBorderColor mx-auto mt-10 text-textColor"
      :href="profile.emailUrl"
      >Say hello</a
    >
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile-store'

const profile = useProfileStore()
</script>

<style scoped>
.neon {
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #00f0ff, 0 0 82px #00f0ff, 0 0 92px #00f0ff,
    0 0 102px #00f0ff, 0 0 151px #00f0ff;
  animation: pulsate 1.5s infinite alternate;
}

.neon:hover {
  animation: pulsate 1.5s infinite alternate;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #00f0ff, 0 0 0.8rem #00f0ff, 0 0 2.8rem #00f0ff,
    inset 0 0 1.3rem #00f0ff;
}

@keyframes pulsate {
  100% {
    text-shadow: 0 0 4px #fff, 0 0 11px #fff, 0 0 19px #fff, 0 0 40px #00f0ff, 0 0 80px #00f0ff, 0 0 90px #00f0ff,
      0 0 100px #00f0ff, 0 0 150px #00f0ff;
  }

  0% {
    text-shadow: 0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px #00f0ff, 0 0 45px #00f0ff, 0 0 55px #00f0ff,
      0 0 70px #00f0ff, 0 0 80px #00f0ff;
  }
}
</style>
