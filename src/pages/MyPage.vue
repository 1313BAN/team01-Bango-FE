<script setup lang="ts">
import { ref } from "vue";
import { Button } from "@/components/ui/button";

const userInfo = ref({
  code: 200,
  message: "회원 조회에 성공했습니다.",
  data: {
    name: "Google_User_3e101c",
    email: "alex68566856@gmail.com",
    socialPlatform: "GOOGLE",
  },
});
</script>

<template>
  <div
    class="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded-2xl space-y-6"
  >
    <h2 class="text-2xl font-bold text-center">내 정보</h2>

    <div class="space-y-4 text-gray-700">
      <div>
        <span class="font-semibold">이름:</span> {{ userInfo.data.name }}
      </div>
      <div>
        <span class="font-semibold">이메일:</span> {{ userInfo.data.email }}
      </div>
      <div>
        <span class="font-semibold">소셜 플랫폼:</span>
        {{ userInfo.data.socialPlatform }}
      </div>
    </div>

    <div class="flex justify-between pt-4">
      <Button variant="outline">수정</Button>
      <Button variant="destructive">탈퇴</Button>
    </div>
  </div>
</template>
