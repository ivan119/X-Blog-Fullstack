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

async function getTweet(id, useLoading = false) {
  loading.value = !useLoading
  try {
    const response = await getTweetById(id || getTweetIdFromRoute())
    tweet.value = response?.tweet
  } catch (e) {
  } finally {
    loading.value = false
  }
}

watch(
  () => useRouter().currentRoute.value,
  (newRoute) => {
    // This function will be called whenever the route changes
    getTweet(newRoute.params.id, false)
  }
)

onBeforeMount(() => {
  getTweet(null, false)
})
</script>
<template>
  <div>
    <pages-home title="Tweet" :loading="loading">
      <Head>
        <Title>Test</Title>
      </Head>
      <TweetDetails
        :user="user"
        :tweet="tweet"
        @refresh-data="getTweet(null, true)"
      />
    </pages-home>
  </div>
</template>