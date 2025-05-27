<template>
  <div class="bg-white border rounded-xl p-4 mb-6 flex flex-wrap items-center gap-8">
    <div class="flex items-center space-x-2">
      <span class="text-gray-700 font-medium">진행상태</span>
      <select
        v-model="selectedStatus"
        class="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="">전체</option>
        <option value="모집예정">모집예정</option>
        <option value="모집중">모집중</option>
        <option value="모집완료">모집완료</option>
      </select>
    </div>

    <div class="flex items-center space-x-2">
      <span class="text-gray-700 font-medium">공급유형</span>
      <select
        v-model="selectedSupplyType"
        class="px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <option value="">전체</option>
        <option value="행복주택">행복주택</option>
        <option value="전세임대">전세임대</option>
        <option value="매입임대">매입임대</option>
      </select>
    </div>

    <button
      @click="applyFilters"
      class="ml-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
      aria-label="검색하기"
    >
      검색하기
    </button>

    <button
      @click="resetFilters"
      class="ml-4 text-sm text-gray-500 hover:text-indigo-600 transition-colors"
      aria-label="필터 초기화"
    >
      필터 초기화
    </button>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits, defineProps } from 'vue'

const emit = defineEmits(['update:status', 'update:supplyType', 'reset'])
const props = defineProps({
  status: String,
  supplyType: String,
})

const selectedStatus = ref(props.status || '')
const selectedSupplyType = ref(props.supplyType || '')

watch(() => props.status, (newVal) => {
  selectedStatus.value = newVal || ''
})

watch(() => props.supplyType, (newVal) => {
  selectedSupplyType.value = newVal || ''
})

const applyFilters = () => {
  emit('update:status', selectedStatus.value)
  emit('update:supplyType', selectedSupplyType.value)
}

const resetFilters = () => {
  selectedStatus.value = ''
  selectedSupplyType.value = ''
  emit('reset')
  emit('update:status', '')
  emit('update:supplyType', '')
}
</script>