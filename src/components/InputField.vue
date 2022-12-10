<template>
  <label class="flex flex-col">
    <span class="text-slate-200">{{ label }}</span>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
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
