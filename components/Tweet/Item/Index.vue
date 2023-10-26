<script setup>
const props = defineProps({
  tweet: {
    type: Object,
    required: true,
    default: () => {},
  },
  compact: {
    type: Boolean,
    default: false,
  },
})
const { twitterBorderColor } = useTailwindConfig()
const tweetBodyWrapper = computed(() =>
  props?.compact ? 'ml-16' : 'ml-2 mt-4'
)
const textSize = computed(() => (props?.compact ? 'text-base' : 'text-2xl'))
</script>

<template>
  <div>
    <TweetItemHeader :tweet="tweet" />
    <div :class="tweetBodyWrapper">
      <p
        class="flex-shrink font-medium text-gray-900 w-auto dark:text-white"
        :class="textSize"
      >
        {{ props.tweet.text }}
      </p>
      <div
        v-for="image in tweet.mediaFiles"
        :key="image.id"
        class="flex my-3 mr-2 border-2 rounded-2xl"
        :class="twitterBorderColor"
      >
        <img :src="image.url" alt="" class="w-full rounded-2xl" />
      </div>
      <div class="mt-2">
        <TweetItemActions :tweet="props.tweet" :compact="props.compact" />
      </div>
    </div>
  </div>
</template>