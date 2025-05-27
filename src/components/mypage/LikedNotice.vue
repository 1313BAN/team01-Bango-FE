<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h2 class="text-2xl font-bold mb-4">공공임대주택 모집공고 리스트</h2>

    <div v-if="loading" class="text-center text-gray-500">로딩 중...</div>
    <div v-else-if="error" class="text-red-500 mb-4 text-center">
      {{ error }}
    </div>

    <table
      v-if="notices.length > 0"
      class="w-full text-sm border-collapse rounded overflow-hidden"
    >
      <thead class="bg-gray-100 text-left">
        <tr>
          <th class="p-3 w-36">진행상태</th>
          <th class="p-3">공고명</th>
          <th class="p-3">지역</th>
          <th class="p-3">모집기간</th>
          <th class="p-3">공급기관</th>
          <th class="p-3 text-center">관심공고</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="notice in notices"
          :key="notice.noticeId"
          @click="goDetail(notice.noticeId)"
          class="hover:bg-gray-50 cursor-pointer border-b"
        >
          <td class="p-3 space-x-1">
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-medium',
                statusColorClass(notice),
              ]"
            >
              {{ applyStatus(notice) }}
            </span>
            <span
              v-if="notice.supplyType"
              :class="[
                'px-2 py-0.5 rounded-full text-xs font-medium',
                supplyTypeColorClass(notice.supplyType),
              ]"
            >
              {{ notice.supplyType }}
            </span>
          </td>
          <td class="p-3 font-medium">
            {{ notice.noticeName || "제목 없음" }}
          </td>
          <td class="p-3">{{ notice.sidoName }} {{ notice.gugunName }}</td>
          <td class="p-3">
            {{ formatDate(notice.beginDate) }} -
            {{ formatDate(notice.endDate) }}
          </td>
          <td class="p-3">{{ notice.institutionType }}</td>
          <td class="p-3 text-center">
            <button @click.stop="toggleLike(notice)">
              <svg
                v-if="notice.isLiked"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-500 inline-block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-400 inline-block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <Pagination
      v-if="totalPages >= 1"
      :currentPage="pageNo"
      :totalPages="totalPages"
      @change-page="changePage"
      class="mt-6"
    />

    <LoginAlertModal
      v-if="showLoginAlert"
      @confirm="goLogin"
      @cancel="() => (showLoginAlert = false)"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import Pagination from "@/components/ui/pagination/Pagination.vue";
import LoginAlertModal from "@/components/login/LoginAlertModal.vue";
import NoticeFilter from "@/components/searchNotice/NoticeFilter.vue";
import { formatDate } from "@/utils/dateUtils";
import { applyStatus, statusColorClass } from "/src/utils/noticeUtils.js";
import {
  getLikedNotices,
  getNotices,
  likeNotice,
  unlikeNotice,
} from "@/api/rentalnotice";
import { useAuthStore } from "@/stores/auth";
import { NOTICE } from "@/api/endpoint";

const router = useRouter();

const authStore = useAuthStore();

const notices = ref([]);
const loading = ref(false);
const error = ref(null);

const pageNo = ref(1);
const pageSize = 10;
const totalPages = ref(1);

const today = new Date();

const showLoginAlert = ref(false);

const filterStatus = ref("");
const filterSupplyType = ref("");

// 페이지 번호 바뀔 때 공고 다시 가져오기
watch(pageNo, () => {
  fetchNotices();
});

const fetchNotices = async () => {
  loading.value = true;
  error.value = null;

  try {
    const query = {
      pageNo: pageNo.value,
      pageSize,
      status: filterStatus.value,
      supplyType: filterSupplyType.value,
    };
    // console.log(query);

    const res = await getLikedNotices();

    console.log(res);

    notices.value = res.noticeLikeList.map((item) => ({
      ...item.rentalNotice,
      noticeId: item.rentalNotice.noticeId,
      isLiked: true,
    }));

    totalPages.value = res.totalPageNo;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
};

const supplyTypeColorClass = (type) => {
  const colorMap = {
    행복주택: "bg-yellow-100 text-yellow-800",
    전세임대: "bg-gray-100 text-gray-800",
    매입임대: "bg-green-100 text-green-800",
  };
  return colorMap[type] || "bg-gray-100 text-gray-600";
};

const goDetail = (id) => {
  router.push({ name: "NoticeDetail", params: { id } });
};

const changePage = (newPage) => {
  if (newPage < 1 || newPage > totalPages.value) return;
  pageNo.value = newPage;
  // fetchNotices()는 watch(pageNo)에서 호출됨
};

const toggleLike = async (notice) => {
  try {
    // console.log(notice.noticeId);
    let res;
    if (notice.isLiked) {
      res = await unlikeNotice(notice.noticeId);
      if (res.code !== 204) throw new Error("좋아요 취소 요청 실패");
    } else {
      res = await likeNotice(notice.noticeId);
      if (res.code !== 201) throw new Error("좋아요 요청 실패");
    }
    console.log(res);

    notice.isLiked = !notice.isLiked;
  } catch (e) {
    console.log(e);
    console.log(e.response.data.code);
    if (e.response.data.code === 400 || e.response.data.code === 401) {
      showLoginAlert.value = true;
      return;
    } else {
      console.error("좋아요 토글 에러:", e.message);
      alert("좋아요 처리 중 오류가 발생했습니다.");
    }
  }
};

onMounted(() => {
  fetchNotices();
});
</script>

<style scoped>
table {
  border: 1px solid #ddd;
}
th,
td {
  border-bottom: 1px solid #eee;
}
button {
  background: transparent;
  border: none;
  cursor: pointer;
}
</style>
