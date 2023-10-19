<template>
  <div>
    <pages-home title="Home Page" :loading="loading">
      <TweetForm :user="user" />
    </pages-home>
  </div>
</template>
<script setup>
import useAuth from '~/composables/useAuth'

const loading = ref(false)
const { useAuthUser } = useAuth()
const user = useAuthUser()
</script>