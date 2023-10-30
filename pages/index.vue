<script setup>
import useAuth from '~/composables/useAuth'
import ListFeed from '~/components/Tweet/ListFeed.vue'
import useTweets from '~/composables/useTweets'

const { twitterBorderColor } = useTailwindConfig()
const homeTweets = ref([])
const loading = ref(false)
const { getHomeTweets } = useTweets()
const { useAuthUser } = useAuth()
const user = useAuthUser()
const handleFormSuccess = (tweet) => {
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}
onBeforeMount(async () => {
  loading.value = true
  try {
    const { tweets } = await getHomeTweets()
    homeTweets.value = tweets
  } catch (e) {
    console.log(e)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <pages-home title="Home Page" :loading="loading">
      <Head>
        <Title>Home / Twitter</Title>
      </Head>
      <div class="border-b" :class="twitterBorderColor">
        <TweetForm :user="user" @on-success="handleFormSuccess" />
      </div>
      <ListFeed :tweets="homeTweets" />
    </pages-home>
  </div>
</template>