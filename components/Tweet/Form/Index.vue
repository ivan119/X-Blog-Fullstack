<script setup>
import useTweets from '~/composables/useTweets'

const { postTweet } = useTweets()
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const handleFormSubmit = async (data) => {
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    })
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}
</script>
<template>
  <div>
    <TweetFormInput :user="props.user" @on-submit="handleFormSubmit" />
  </div>
</template>
1