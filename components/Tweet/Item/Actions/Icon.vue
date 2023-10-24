<template>
  <div
    class="flex items-center text-gray-400 cursor-pointer dark:text-white group"
  >
    <div
      :class="`p-2 rounded-full group-hover:bg-${props.color}-100 group-hover:text-${props.color}-400 dark:group-hover:bg-opacity-20 ${defaultTransition}`"
    >
      <chat-bubble-bottom-center-icon class="w-5 h-5" />
    </div>
    <span :class="`ml-1 group-hover:text-${props.color}-400`">5</span>
  </div>
</template>
<script setup lang="ts">
const { defaultTransition } = useTailwindConfig()
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  color: {
    type: String,
    required: true,
  },
})
</script>