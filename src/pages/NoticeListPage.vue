<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">공공임대주택 모집공고 리스트</h2>

    <div v-if="loading" class="text-center">로딩 중...</div>
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <Table v-if="notices.length > 0">
      <TableCaption>가장 최근 모집 공고 목록입니다.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead class="w-[200px]">모집공고명</TableHead>
          <TableHead>지역</TableHead>
          <TableHead>유형</TableHead>
          <TableHead>기관</TableHead>
          <TableHead>모집기간</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow
          v-for="notice in notices"
          :key="notice.noticeId"
          @click="goDetail(notice.noticeId)"
          class="hover:bg-gray-100 cursor-pointer"
        >
          <TableCell class="font-medium">{{ notice.noticeName || '제목 없음' }}</TableCell>
          <TableCell>{{ notice.sidoName }} {{ notice.gugunName }}</TableCell>
          <TableCell>{{ notice.supplyType }} / {{ notice.houseType }}</TableCell>
          <TableCell>{{ notice.institutionType }}</TableCell>
          <TableCell>
            {{ formatDate(notice.beginDate) }} ~ {{ formatDate(notice.endDate) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <Pagination
      v-if="totalPages >= 1"
      :currentPage="pageNo"
      :totalPages="totalPages"
      @change-page="changePage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import Table from '@/components/ui/table/Table.vue'
import TableHeader from '@/components/ui/table/TableHeader.vue'
import TableBody from '@/components/ui/table/TableBody.vue'
import TableRow from '@/components/ui/table/TableRow.vue'
import TableHead from '@/components/ui/table/TableHead.vue'
import TableCell from '@/components/ui/table/TableCell.vue'
import TableCaption from '@/components/ui/table/TableCaption.vue'
import Pagination from '@/components/ui/pagination/Pagination.vue'

const notices = ref([])
const loading = ref(false)
const error = ref(null)
const router = useRouter()

const pageNo = ref(1)
const pageSize = 10
const totalPages = ref(1)
const totalCount = ref(0)

const fetchNotices = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`http://localhost:8080/api/v1/notice?pageNo=${pageNo.value}&pageSize=${pageSize}`)
    if (!res.ok) throw new Error('공고 목록을 불러오는 데 실패했습니다.')

    const json = await res.json()
    console.log("서버 응답 :", json)

    notices.value = json.data.noticeWithLikeds.map(item => ({
      ...item.rentalNotice,
      noticeId: item.rentalNotice.noticeId
    }))
    totalPages.value = json.data.totalPageNo
    totalCount.value = json.data.totalPageCount
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

const goDetail = (id) => {
  router.push({ name: 'NoticeDetail', params: { id } })
}

const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return
  pageNo.value = newPage
  fetchNotices()
}

onMounted(fetchNotices)
watch(pageNo, fetchNotices)
</script>

<style scoped>
.hover\:bg-gray-100:hover {
  background-color: #f3f4f6;
}
</style>