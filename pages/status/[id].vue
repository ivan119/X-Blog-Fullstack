<script setup>
import useTweets from '~/composables/useTweets'
import useAuth from '~/composables/useAuth'

const getTweetIdFromRoute = () => {
  return useRoute().params.id
}
const tweet = ref({})
const { getTweetById } = useTweets()
const getTweet = async () => {
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdFromRoute())
    tweet.value = response?.tweet
  } catch (e) {
  } finally {
    loading.value = false
  }
}
const loading = ref(false)
onBeforeMount(async () => {
  await getTweet()
})
const { useAuthUser } = useAuth()
const user = useAuthUser()
watch(
  () => useRoute().fullPath,
  () => getTweet()
)
</script>
<template>
  <div>
    <pages-home title="Tweet" :loading="loading">
      <Head>
        <Title>Test</Title>
      </Head>
      <TweetDetails :user="user" :tweet="tweet" />
    </pages-home>
  </div>
</template>