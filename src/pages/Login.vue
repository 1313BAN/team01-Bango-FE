<script setup lang="ts">
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KAKAO_CODE_REQ_URL, GOOGLE_CODE_REQ_URL } from "@/constants/member";
import kakaoIcon from "@/assets/kakao-icon.svg";
import googleIcon from "@/assets/google-icon.svg";

const kakaoLoginHandler = () => {
  // 카카오 로그인을 통해 code 획득
  window.location.href = KAKAO_CODE_REQ_URL;
};
const googleLoginHandler = () => {
  window.location.href = GOOGLE_CODE_REQ_URL;
};
</script>

<template>
  <Card class="max-w-md mx-auto p-8 mt-16 shadow-xl rounded-2xl">
    <div class="flex flex-col items-center space-y-6">
      <h1 class="text-3xl font-bold tracking-tight">Bango</h1>
      <p class="text-sm text-gray-500 text-center">
        임대주택 공고를 쉽고 빠르게 찾아보세요.
      </p>

      <div class="w-full space-y-4">
        <!-- 간편 로그인 -->
        <div class="text-center text-gray-500 font-medium">간편 로그인</div>
        <div class="flex flex-col gap-3 items-center">
          <Button
            class="flex justify-center items-center w-80 gap-2 bg-[#FEE500] text-black font-semibold py-2 rounded-xl text-center hover:bg-[#ffd900] hover:scale-[1.02] transition-transform cursor-pointer"
            @click="kakaoLoginHandler"
          >
            <img :src="kakaoIcon" />
            카카오로 시작하기
          </Button>
          <Button
            class="flex justify-center items-center w-80 gap-2 bg-gray-200 text-black font-semibold py-2 rounded-xl text-center hover:bg-gray-300 hover:scale-[1.02] transition-transform cursor-pointer"
            @click="googleLoginHandler"
          >
            <img :src="googleIcon" />
            구글로 시작하기
          </Button>
        </div>
      </div>
    </div>
  </Card>
</template>
