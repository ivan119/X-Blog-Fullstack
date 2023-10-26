<script setup>
import { ChatBubbleBottomCenterIcon } from '@heroicons/vue/24/solid'
import {
  ArrowPathIcon,
  HeartIcon,
  ArrowUpTrayIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  tweet: {
    type: Object,
    required: true,
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
const size = computed(() => (props?.compact ? 5 : 8))
</script>

<template>
  <div class="flex items-center justify-around w-full">
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <chat-bubble-bottom-center-icon :class="classes" />
      </template>

      <template v-if="props.compact" v-slot:default
        >{{ props.tweet.repliesCount }}
      </template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="green" :size="size">
      <template v-slot:icon="{ classes }">
        <arrow-path-icon :class="classes" />
      </template>

      <template v-if="props.compact" v-slot:default>9</template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="red" :size="size">
      <template v-slot:icon="{ classes }">
        <heart-icon :class="classes" />
      </template>

      <template v-if="props.compact" v-slot:default>9</template>
    </TweetItemActionsIcon>
    <TweetItemActionsIcon color="blue" :size="size">
      <template v-slot:icon="{ classes }">
        <arrow-up-tray-icon :class="classes" />
      </template>

      <template v-if="props.compact" v-slot:default>9</template>
    </TweetItemActionsIcon>
  </div>
</template>