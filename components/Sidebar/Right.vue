<template>
  <div class="flex flex-col">
    <!---Preview Card: What's happening -->

    <sidebar-preview-card title="What's happening">
      <sidebar-preview-card-item
        v-for="whatsHappening in whatsHappeningItems"
        :key="whatsHappening"
      >
        <div>
          <h2 class="font-bold text-gray-800 text-md dark:text-white">
            {{ whatsHappening.title }}
          </h2>
          <p class="text-xs text-gray-400">{{ whatsHappening.count }}</p>
        </div>
      </sidebar-preview-card-item>
    </sidebar-preview-card>

    <!---Preview Card: Who to follow -->

    <sidebar-preview-card title="Who to follow">
      <sidebar-preview-card-item
        v-for="whoToFollow in whoToFollowItems"
        :key="whoToFollow"
      >
        <div class="flex flex-row items-center justify-between">
          <div class="flex flex-row space-x-2">
            <img
              class="w-10 h-10 rounded-full"
              :src="whoToFollow.image"
              :alt="whoToFollow.name"
            />
            <div class="flex flex-col">
              <h1 class="text-sm font-bold text-gray-900 dark:text-white">
                {{ whoToFollow.name }}
              </h1>
              <h1 class="text-xs text-gray-400">{{ whoToFollow.handle }}</h1>
            </div>
          </div>
          <div class="flex h-full">
            <button
              class="px-4 py-2 font-bold text-xs text-white dark:text-black bg-black dark:bg-white rounded-full"
            >
              Follow
            </button>
          </div>
        </div>
      </sidebar-preview-card-item>
    </sidebar-preview-card>
  </div>
</template>
<script setup>
const whatsHappeningItems = ref([
  {
    title: 'Space-x',
    count: '19k Tweets',
  },
  {
    title: '#ultime-code-x',
    count: '29k Tweets',
  },
  {
    title: '#art-x',
    count: '39k Tweets',
  },
])
const whoToFollowItems = ref([
  {
    name: 'Joe Biden',
    handle: '@JoeBiden',
    image: 'https://picsum.photos/100/100',
  },
  {
    name: 'Joe Biden',
    handle: '@JoeBiden',
    image: 'https://picsum.photos/100/100',
  },
  {
    name: 'Joe Biden',
    handle: '@JoeBiden',
    image: 'https://picsum.photos/100/100',
  },
])
</script>
