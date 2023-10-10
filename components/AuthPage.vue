<template>
  <div class="flex h-screen">
    <div class="hidden sm:block relative flex-1 linear-transition">
      <img
        class="absolute inset-0 object-cover w-full h-full"
        src="https://wallpapercave.com/wp/wp11484805.jpg"
        alt=""
      />
    </div>
    <div
      :class="{ 'animate-pulse': $refs?.auth?.loading?.value }"
      class="absolute sm:right-0 backdrop-blur-lg linear-transition h-screen border-4 w-full sm:w-1/2 xl:w-1/3 p-4 sm:p-8 xl:p-16"
      :style="{
        borderImage:
          'linear-gradient(45deg, rgba(255, 0, 0, 0.369 ), rgba(0, 0, 255, 0.5)) 1',
        borderImageSlice: 1,
      }"
    >
      <div
        @mouseover="runFun(false)"
        @mouseleave="runFun(true)"
        class="flex border-2 bg-gray-900 w-full h-full justify-center items-center mx-auto"
        style="
          background-image: url('https://jingculturecrypto.com/wp-content/uploads/2022/07/christies-arttech-22-mdj.jpg');
        "
      >
        <auth-form ref="auth" class="bg-black -z-1 absolute" />
      </div>
    </div>
  </div>
</template>

<script setup>
const changeBool = ref(true)
const runFun = (value) => {
  changeBool.value = value
}
</script>
<style>
.linear-transition {
  @apply transition-all ease-linear duration-200;
}
@keyframes borderChange {
  0% {
    border-color: rgba(255, 0, 0, 0.5);
  }
  25% {
    border-color: rgba(0, 255, 0, 0.5);
  }
  50% {
    border-color: rgba(0, 0, 255, 0.5);
  }
  75% {
    border-color: rgba(255, 255, 0, 0.5);
  }
  100% {
    border-color: rgba(0, 255, 255, 0.5);
  }
}
</style>
