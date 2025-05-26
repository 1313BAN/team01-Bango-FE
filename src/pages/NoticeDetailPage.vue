<template>
  <div class="notice-detail-page" v-if="notice">
    <h1>{{ notice.title }}</h1>
    <p><strong>모집기간:</strong> {{ formatDate(notice.startDate) }} ~ {{ formatDate(notice.endDate) }}</p>
    <p><strong>공고번호:</strong> {{ notice.noticeNumber }}</p>
    <div class="content" v-html="notice.content"></div>

    <button @click="goBack">목록으로</button>
  </div>
  <div v-else-if="loading">로딩 중...</div>
  <div v-else-if="error" class="error">{{ error }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const notice = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchNoticeDetail = async (id) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`http://localhost:8080/api/v1/notice/${id}`) // 실제 API URL로 변경하세요
    if (!res.ok) throw new Error('공고 상세를 불러오는 데 실패했습니다.')
    notice.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString()
}

const goBack = () => {
  router.back()
}

onMounted(() => {
  fetchNoticeDetail(route.params.id)
})
</script>

<style scoped>
.error {
  color: red;
  margin-top: 12px;
}
.content {
  white-space: pre-wrap;
  margin-top: 20px;
  border: 1px solid #ddd;
  padding: 16px;
  background-color: #fafafa;
}
button {
  margin-top: 20px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
