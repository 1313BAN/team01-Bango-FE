<!-- src/components/common/LoginAlertModal.vue -->
<template>
    <div
    class="fixed inset-0 z-50 flex items-center justify-center"
    style="background-color: rgba(0, 0, 0, 0.5);"
    @click.self="$emit('cancel')"
    >
    <div class="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center space-y-6">
      <h3 class="text-lg font-semibold text-gray-800">로그인이 필요합니다</h3>
      <p class="text-gray-600">해당 기능은 로그인 후 이용 가능합니다.</p>
      <div class="flex justify-center space-x-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 border border-indigo-600 rounded text-indigo-600 hover:bg-indigo-50 transition"
        >
          취소
        </button>
        <button
          @click="$emit('confirm')"
          class="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          로그인 하러가기
        </button>
      </div>
    </div>
  </div>
</template>