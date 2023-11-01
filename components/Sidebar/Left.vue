<script setup>
import { HomeIcon } from '@heroicons/vue/24/solid'
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  DocumentTextIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
  PencilIcon,
} from '@heroicons/vue/24/outline'

const { defaultTransition } = useTailwindConfig()
const emits = defineEmits(['onTweet'])
</script>

<template>
  <div class="h-screen flex flex-col">
    <div
      class="p-2 hover:rounded-full hover:bg-blue-50 bg-dim-900 dark:hover:bg-white/20"
      :class="defaultTransition"
    >
      <nuxt-link to="/">
        <div class="w-8 h-8">
          <logo-twitter />
        </div>
      </nuxt-link>
    </div>
    <div class="mt-2 space-y-3">
      <sidebar-tab active>
        <template #icon>
          <home-icon />
        </template>
        <template #name>Home</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <hashtag-icon />
        </template>
        <template #name>Explore</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <bell-icon />
        </template>
        <template #name>Notification</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <inbox-icon />
        </template>
        <template #name>Messages</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <bookmark-icon />
        </template>
        <template #name>Bookmarks</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <document-text-icon />
        </template>
        <template #name>Lists</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <user-icon />
        </template>
        <template #name>Profile</template>
      </sidebar-tab>
      <sidebar-tab>
        <template #icon>
          <ellipsis-horizontal-circle-icon />
        </template>
        <template #name>More</template>
      </sidebar-tab>
      <div class="hidden xl:block">
        <UIButton @on-click="emits('onTweet')" liquid size="lg">
          <span class="font-bold">Tweet</span>
        </UIButton>
      </div>
      <div class="block xl:hidden">
        <UIButton @on-click="emits('onTweet')" liquid size="lg">
          <div class="w-6 h-6 font-bold">
            <span class="font-bold"><PencilIcon /></span>
          </div>
        </UIButton>
      </div>
    </div>
  </div>
</template>