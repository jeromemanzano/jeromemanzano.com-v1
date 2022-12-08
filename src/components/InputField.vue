<template>
  <label class="flex flex-col">
    <span class="text-textColor">{{ label }}</span>
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
