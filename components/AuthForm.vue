<template>
  <div>
    <div class="pt-5 space-y-6">
      <UIInput
        value="hello"
        label="Username"
        placeholder="@username"
        v-model="form.userName"
      />
      <UIInput
        value="hello"
        placeholder="********"
        type="password"
        label="Password"
        v-model="form.password"
      />
      <button
        class="flex space-x-4 text-center py-2 px-4 rounded-full border border-gray-300 bg-green-400 hover:bg-green-600 transition-all ease-linear duration-400"
        @click="submitLoginForm"
      >
        <span v-if="!form.loading">Submit</span>
        <UISpinner class="h-5" v-if="form.loading" />
      </button>
    </div>
  </div>
</template>

<script setup>
import useAuth from '~/composables/useAuth'

const form = reactive({
  userName: null,
  password: null,
  loading: false,
})
async function submitLoginForm() {
  const { login } = useAuth()
  form.loading = true
  try {
    await login(form.userName, form.password)
  } catch (error) {
    console.log(error)
  } finally {
    form.loading = false
  }
}
</script>
