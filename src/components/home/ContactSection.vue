<template>
  <section class="h-screen flex flex-col justify-center">
    <p
      class="font-roboto transition from:opacity-0 from:translate-x-5 duration-500 max-w-3xl mx-auto text-xl md:text-2xl"
    >
      If you&#39;re looking for someone to help you build your vision, then please get in touch – I&#39;d love to hear
      from you!
    </p>

    <a
      class="neon text-lg md:text-2xl px-6 py-4 border-[1px] border-neutral-300 mx-auto mt-10 text-slate-200 hover:text-neutral-900 uppercase fill-hover transition from:opacity-0 from:translate-x-5 before:-z-10"
      :href="profile.emailUrl"
      >Say hello</a
    >
  </section>
</template>

<script setup lang="ts">
import { useProfileStore } from '@/stores/profile-store'

const profile = useProfileStore()
</script>
