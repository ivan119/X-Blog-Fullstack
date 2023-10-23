<script setup>
import useTweets from '~/composables/useTweets'

const loading = ref(false)
const { postTweet } = useTweets()
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => {},
  },
})

const handleFormSubmit = async (data) => {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    })
    console.log(response)
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center p-6">
      <UISpinner />
    </div>
    <TweetFormInput v-else :user="props.user" @on-submit="handleFormSubmit" />
  </div>
</template>
1