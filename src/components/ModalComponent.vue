<template>
  <transition name="modal-fade">
    <div ref="container">
      <div
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header id="modalTitle">
          <slot name="header"></slot>
        </header>

        <section id="modalDescription">
          <slot name="body"> </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"> </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const emits = defineEmits(['close'])
const container = ref(null)

onClickOutside(container, () => emits('close'))
</script>

<style scoped></style>
