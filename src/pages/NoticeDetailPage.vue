<template>
  <div :id="id">
    <!-- 상단 헤더 + 버튼 -->
    <header class="flex items-center justify-between mb-6 mx-auto max-w-2xl px-4 py-5">
      <h2 class="text-2xl font-bold text-gray-900 select-none pr-4">
        입주자 모집공고
      </h2>
      <button
        @click="goBack"
        class="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700 transition duration-200"
        aria-label="목록으로 돌아가기"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        목록으로
      </button>
    </header>

    <div class="max-w-2xl mx-auto p-4 border rounded-lg shadow bg-white overflow-auto max-h-[90vh] flex flex-col mt-6 mb-6">
      <!-- 로딩 / 에러 -->
      <template v-if="loading">
        <p class="text-center text-gray-500 flex-grow">로딩 중...</p>
      </template>

      <template v-else-if="error">
        <p class="text-center text-red-500 flex-grow">{{ error }}</p>
      </template>

      <template v-else-if="rentalNotice && Object.keys(rentalNotice).length">
        <!-- 카드뷰 본문 -->
        <div class="flex-1 space-y-6 mb-6">
          <!-- 이미지 + 제목 + 좋아요 + 기관명 + 상태 -->
          <div class="flex items-start gap-4 border-b pb-3">
            <!-- 이미지 -->
            <div class="w-24 h-24 bg-gray-100 rounded-md overflow-hidden">
              <img
                :src="rentalNotice.imageUrl || '/images/default-notice.png'"
                alt="공고 이미지"
                class="object-cover w-full h-full"
              />
            </div>
            <!-- 제목 + 좋아요 + 기관 + 상태 -->
            <div class="flex-1 space-y-1">
              <div class="flex items-center justify-between">
                <h1 class="text-xl font-semibold text-gray-900">{{ rentalNotice.noticeName }}</h1>
                <span
                  :class="rentalNotice.isLiked ? 'text-red-500 text-lg' : 'text-gray-400 text-lg'"
                  title="좋아요 상태"
                >
                  {{ rentalNotice.isLiked ? '❤️' : '♡' }}
                </span>
              </div>
              <div class="flex flex-wrap gap-1 text-xs text-gray-600">
                <span :class="`px-2 py-0.5 rounded-full ${statusColorClass(rentalNotice)}`">
                  상태: {{ applyStatus(rentalNotice) }}
                </span>
                <span class="px-2 py-0.5 bg-green-100 text-green-800 rounded-full">
                  종류: {{ rentalNotice.status || '-' }}
                </span>
                <span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                  기관: {{ rentalNotice.institutionType || '-' }}
                </span>
              </div>
            </div>
          </div>

          <section>
            <h3 class="text-base font-semibold text-gray-700 mb-2">공고 일정</h3>
            <table class="w-full text-sm border rounded overflow-hidden">
              <tbody>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2 w-40">모집공고일</th>
                  <td class="p-2">{{ formatDate(rentalNotice.announceDate) || '-' }}</td>
                </tr>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2">접수기간</th>
                  <td class="p-2">
                    {{ formatDate(rentalNotice.beginDate) || '-' }} ~ {{ formatDate(rentalNotice.endDate) || '-' }}
                  </td>
                </tr>
                <tr>
                  <th scope="row" class="bg-gray-50 p-2">모집공고 확인</th>
                  <td class="p-2">
                    <a
                      :href="rentalNotice.institutionUrl || '#'"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-300 ease-in-out"
                      :class="{ 'pointer-events-none opacity-50 cursor-not-allowed': !rentalNotice.institutionUrl }"
                    >
                      확인하기
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14 3h7v7m0 0L10 21l-7-7 11-11z" />
                      </svg>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          <!-- 단지 기본 정보 -->
          <section>
            <h3 class="text-base font-semibold text-gray-700 mb-2">단지 기본정보</h3>
            <table class="w-full text-sm border rounded overflow-hidden">
              <tbody>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2 w-32">단지명</th>
                  <td class="p-2">{{ rentalNotice.houseName || '-' }}</td>
                  <th scope="row" class="bg-gray-50 p-2 w-32">주택 유형</th>
                  <td class="p-2">{{ rentalNotice.houseType || '-' }}</td>
                </tr>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2">주소</th>
                  <td class="p-2" colspan="3">
                    {{ rentalNotice.sidoName || '-' }} {{ rentalNotice.gugunName || '' }}
                  </td>
                </tr>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2">공급형태</th>
                  <td class="p-2">{{ rentalNotice.supplyType || '-' }}</td>
                  <th scope="row" class="bg-gray-50 p-2">공급호수</th>
                  <td class="p-2">{{ rentalNotice.supplyHoCount || '-' }}</td>
                </tr>
                <tr class="border-b">
                  <th scope="row" class="bg-gray-50 p-2">연락처</th>
                  <td class="p-2" colspan="3">{{ rentalNotice.contactInfo || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>

        <!-- 하단 정보 -->
        <footer class="text-xs text-gray-400 border-t pt-2 mt-4 space-y-0.5">
          <p>업데이트: {{ formatDate(rentalNotice.updatedAt) || '-' }}</p>
          <p>생성일: {{ formatDate(rentalNotice.createdAt) || '-' }}</p>
        </footer>
      </template>

      <template v-else>
        <p class="text-center text-gray-500 flex-grow">공고 정보를 불러오는 중입니다...</p>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/dateUtils'
import { applyStatus, statusColorClass } from '@/utils/noticeUtils'

const props = defineProps({
  id: [String, Number]
})

const route = useRoute()
const router = useRouter()

const notice = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchNoticeDetail = async (id) => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`http://localhost:8080/api/v1/notice/${id}`)
    if (!res.ok) throw new Error('공고 상세를 불러오는 데 실패했습니다.')
    const json = await res.json()
    notice.value = json.data
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const rentalNotice = computed(() => {
  if (!notice.value) return {}
  return notice.value.rentalNotice || notice.value
})

const goBack = () => {
  router.push({ name: 'NoticeListPage' })
}

onMounted(() => {
  fetchNoticeDetail(route.params.id)
})
</script>

<style scoped>
/* 카드뷰 내부와 상하단 헤더/푸터 사이에 여백 추가 */
.mb-6 {
  margin-bottom: 1.5rem;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}
table th:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}
table td:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>