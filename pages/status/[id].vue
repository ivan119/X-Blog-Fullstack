<script setup>
const loading = ref(false)
const tweet = ref(null)
const { getTweetById } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()
const route = useRouter().currentRoute.value

function getTweetIdFromRoute() {
  return route.params.id
}

async function getTweet() {
  loading.value = true
  try {
    const response = await getTweetById(getTweetIdFromRoute())
    tweet.value = response?.tweet
  } catch (e) {
  } finally {
    loading.value = false
  }
}

onBeforeMount(() => {
  getTweet()
})
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