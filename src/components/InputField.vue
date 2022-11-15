<template>
  <label class="flex flex-col">
    <span class="text-aqua">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="bg-[#001518] text-white border-2 border-aqua p-2 outline-0"
    />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: any
    label?: String
    type?: string
  }>(),
  {
    type: 'text',
  }
)
</script>
