<template>
  <nav class="flex justify-center items-center space-x-2 my-4">
    <button
      class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)"
    >
      이전
    </button>

    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('change-page', page)"
      :class="[
        'px-3 py-1 rounded border',
        page === currentPage
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'border-gray-300 text-gray-700'
      ]"
    >
      {{ page }}
    </button>

    <button
      class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
      :disabled="currentPage === totalPages"
      @click="$emit('change-page', currentPage + 1)"
    >
      다음
    </button>
  </nav>
</template>

<script setup>
defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true }
})
</script>