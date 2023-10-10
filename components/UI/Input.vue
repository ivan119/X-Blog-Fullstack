<template>
  <div>
    <label
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      v-if="props.label"
      :for="props.label"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :id="props.label"
        :type="props.type"
        :value="props.modelValue"
        :placeholder="props.placeholder || props.label"
        @input="(event) => emits('update:modelValue', event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  label: {
    type: String,
    default: '',
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
    required: false,
  },
  modelValue: {
    type: String,
    default: () => '',
    required: false,
  },
  type: {
    type: String,
    default: 'text',
    required: false,
  },
})
</script>
