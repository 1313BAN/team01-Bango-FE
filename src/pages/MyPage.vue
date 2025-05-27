<script setup lang="ts">
import { useRouter } from "vue-router";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/stores/auth";
import type { Member } from "@/types/type";

import { withdraw } from "@/api/member";

import LikedNotice from "@/components/mypage/LikedNotice.vue";

const auth = useAuthStore();
const router = useRouter();

const memberInfo: Member | null = auth.getUser;

const withdrawHandler = async () => {
  try {
    await withdraw();
  } finally {
    auth.clearAuth();
    router.push("/");
  }
};
</script>

<template>
  <div class="grid grid-cols-10 mx-25 gap-4">
    <LikedNotice class="col-span-7" />

    <div
      class="col-span-3 max-w-96 min-w-84 h-72 mt-12 p-6 bg-white shadow-md rounded-2xl space-y-6"
    >
      <h2 class="text-2xl font-bold text-center">내 정보</h2>

      <div class="space-y-4 text-gray-700">
        <div>
          <span class="font-semibold">이름:</span> {{ memberInfo?.name }}
        </div>
        <div>
          <span class="font-semibold">이메일:</span> {{ memberInfo?.email }}
        </div>
        <div>
          <span class="font-semibold">소셜 플랫폼:</span>
          {{ memberInfo?.socialPlatform }}
        </div>
      </div>

      <div class="flex justify-between pt-4">
        <Button variant="outline">수정</Button>
        <Button variant="destructive" @click="withdrawHandler">탈퇴</Button>
      </div>
    </div>
  </div>
</template>
