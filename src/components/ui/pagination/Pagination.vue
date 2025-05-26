<template>
  <div class="flex justify-center mt-4 space-x-2">
    <button
      :disabled="currentPage === 1"
      @click="$emit('change-page', currentPage - 1)" class="px-3 py-1 border rounded hover:bg-gray-200"
    >
      이전
    </button>

    <button
      v-for="page in pages"
      :key="page"
      :class="[
        'px-3 py-1 border rounded',
        page === currentPage ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'
      ]"
      @click="$emit('change-page', page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('change-page', currentPage + 1)" class="px-3 py-1 border rounded hover:bg-gray-200"
    >
      다음
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  currentPage: Number,
  totalPages: Number
})

const pages = computed(() => {
  // 단순 전체 페이지 다 나열
  const pageList = []
  for (let i = 1; i <= props.totalPages; i++) {
    pageList.push(i)
  }
  return pageList
})
</script>