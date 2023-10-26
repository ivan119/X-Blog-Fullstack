<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 5,
  },
})
</script>

<template>
  <div
    class="flex items-center text-gray-400 cursor-pointer dark:text-white group"
  >
    <div
      :class="`p-2 rounded-full group-hover:bg-blue-100 group-hover:text-blue-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <slot name="icon" :classes="`w-${props.size} h-${props.size}`"></slot>
    </div>
    <span :class="`ml-1 group-hover:text-${props.color}-400`">
      <slot name="default"></slot
    ></span>
  </div>
</template>