<script setup>
import useTweets from '~/composables/useTweets'

const loading = ref(false)
const { postTweet } = useTweets()

const emits = defineEmits(['onSuccess'])
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => {},
  },
  placeholder: {
    type: String,
    required: false,
  },
  replyTo: {
    type: Object,
    default: null,
  },
})

const handleFormSubmit = async (data) => {
  loading.value = true
  try {
    const response = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
      replyTo: props.replyTo?.id,
    })
    emits('onSuccess', response.tweet)
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
    <TweetFormInput
      :placeholder="props.placeholder"
      v-else
      :user="props.user"
      @on-submit="handleFormSubmit"
    />
  </div>
</template>
1