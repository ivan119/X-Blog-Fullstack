<script setup>
import ListFeed from '~/components/Tweet/ListFeed.vue'

const { getTweets: getTweetsComposable } = useTweets()

const loading = ref(false)
const searchTweets = ref([])
const searchQuery = useRouter().currentRoute.value.query.search
watch(
  () => useRoute().fullPath,
  () => getTweets()
)

onBeforeMount(() => {
  getTweets()
})

async function getTweets() {
  // TODO: FIX WATCHER AND SEARCH QUERY CACHING
  loading.value = true
  console.log(searchQuery, 'searchQuery')
  try {
    const { tweets } = await getTweetsComposable({
      query: searchQuery,
    })

    searchTweets.value = tweets
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <pages-home title="Search" :loading="loading">
      <Head>
        <Title>Search </Title>
      </Head>
      <ListFeed :tweets="searchTweets" />
    </pages-home>
  </div>
</template>