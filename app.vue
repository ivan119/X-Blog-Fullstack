<template>
  <div :class="{ dark: darkMode }">
    <div class="bg-white dark:bg-dim-900">
      <div v-if="isAuthLoading">
        <UILoadingPage />
      </div>
      <!---App--->
      <div v-else-if="user" class="min-h-full">
        <div
          class="grid grid-cols-12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:gap-5"
          :class="defaultTransition"
        >
          <!--Left Sidebar-->
          <div class="hidden md:block xs:col-span-1 xl:col-span-2">
            <div class="sticky top-0">
              <sidebar-left @on-tweet="handleOpenTweetModal" />
            </div>
          </div>
          <!--Main Content-->
          <main class="col-span-12 md:col-span-8 xl:col-span-6">
            <router-view />
          </main>
          <!--Right Sidebar-->
          <div class="hidden md:block md:col-span-3 xl:col-span-4 bg-blue-500">
            <div class="sticky top-0">
              <sidebar-right />
            </div>
          </div>
        </div>
      </div>

      <!---->
      <AuthPage v-else />
      <UIModal :isOpen="postTweetModal" @on-close="handleModalClose">
        <TweetForm
          :reply-to="replyTweet"
          showReply
          :user="user"
          @on-success="handleFormSuccess"
        />
      </UIModal>
    </div>
  </div>
</template>
<script setup>
import useAuth from '~/composables/useAuth'
import useEmitter from '~/composables/useEmitter'

const darkMode = ref(false)
const { defaultTransition } = useTailwindConfig()
const { useAuthUser, initAuth, useAuthLoading } = useAuth()
const {
  openPostTweetModal,
  closePostTweetModal,
  usePostTweetModal,
  useReplyTweet,
} = useTweets()
const isAuthLoading = useAuthLoading()
const user = useAuthUser()
// Modal
const postTweetModal = usePostTweetModal()
const replyTweet = useReplyTweet()
const emitter = useEmitter()
emitter.$on('replyTweet', (tweet) => {
  openPostTweetModal(tweet)
})
const handleFormSuccess = (tweet) => {
  closePostTweetModal()
  navigateTo({
    path: `/status/${tweet.id}`,
  })
}

const handleOpenTweetModal = () => {
  openPostTweetModal(null)
}
const handleModalClose = () => {
  closePostTweetModal()
}
// BeforeMounted
onBeforeMount(() => {
  initAuth()
})
</script>