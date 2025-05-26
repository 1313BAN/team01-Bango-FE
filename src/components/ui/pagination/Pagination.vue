<template>
  <div class="flex justify-center space-x-2 mt-6">
    <!-- 이전 버튼 -->
    <button
      @click="$emit('change-page', currentPage - 1)"
      :disabled="currentPage === 1"
      class="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md shadow transition duration-200"
      :class="[
        currentPage === 1
          ? 'bg-gray-300 text-white cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-indigo-100'
      ]"
    >
      이전
    </button>

    <!-- 페이지 번호 -->
    <button
      v-for="page in pagesToShow"
      :key="page"
      @click="$emit('change-page', page)"
      class="px-4 py-2 text-sm font-medium rounded-md shadow transition duration-200"
      :class="[
        page === currentPage
          ? 'bg-indigo-700 text-white'
          : 'bg-white text-gray-700 hover:bg-indigo-100'
      ]"
    >
      {{ page }}
    </button>

    <!-- 다음 버튼 -->
    <button
      @click="$emit('change-page', currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-md shadow transition duration-200"
      :class="[
        currentPage === totalPages
          ? 'bg-gray-300 text-white cursor-not-allowed'
          : 'bg-white text-gray-700 hover:bg-indigo-100'
      ]"
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

const pagesToShow = computed(() => {
  const range = []
  const maxVisible = 5
  let start = Math.max(props.currentPage - Math.floor(maxVisible / 2), 1)
  let end = start + maxVisible - 1

  if (end > props.totalPages) {
    end = props.totalPages
    start = Math.max(end - maxVisible + 1, 1)
  }

  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
})
</script>