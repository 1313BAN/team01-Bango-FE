<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goHome(): void {
  router.push("/");
  window.location.reload();
}

function retry(): void {
  window.location.reload();
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
      <div class="mb-6">
        <svg
          class="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h2 class="text-2xl font-bold text-gray-900 mb-4">
        Bango에 문제가 발생했습니다
      </h2>
      <p class="text-gray-600 mb-8">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div class="space-y-4">
        <button
          @click="retry"
          class="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label="페이지 새로고침"
        >
          다시 시도
        </button>
        <button
          @click="goHome"
          class="w-full bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          aria-label="홈페이지로 이동"
        >
          홈으로
        </button>
      </div>
    </div>
  </div>
</template>
