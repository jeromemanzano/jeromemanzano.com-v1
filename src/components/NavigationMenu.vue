<template>
  <div ref="container">
    <div
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalBody"
      class="flex flex-col sm:flex-row p-6 sm:p-0"
    >
      <button
        type="button"
        class="sm:hidden flex justify-start"
        @click="emits('close')"
      >
        <font-awesome-icon
          icon="fa-solid fa-xmark"
          class="h-10 w-10 hover:text-cyan-400"
        />
      </button>
      <header id="modalTitle">
        <slot name="header"></slot>
      </header>

      <section
        id="modalBody"
        class="flex p-0 flex-auto sm:flex-none"
      >
        <slot name="body"> </slot>
      </section>

      <footer class="flex">
        <slot name="footer"> </slot>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const emits = defineEmits(['close'])
const container = ref(null)

onClickOutside(container, () => emits('close'))
</script>

<style scoped></style>
