<script setup>
const props = defineProps({
  tweets: {
    type: Array,
    required: true,
    default: () => [],
  },
})
</script>

<template>
  <div>
    <h1>List feed</h1>
    <ul>
      <li v-for="item in props.tweets">{{ item.text }}</li>
    </ul>
  </div>
</template>