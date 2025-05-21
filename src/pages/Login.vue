<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "@/api/auth";
import { useAuthStore } from "@/stores/auth";

import { Card, CardTitle } from "@/components/ui/card";
import { KAKAO_CODE_REQ_URL, GOOGLE_CODE_REQ_URL } from "@/api/oAuths";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/button/Button.vue";

const router = useRouter();
const route = useRoute();
const id = ref("");
const password = ref("");
const error = ref("");
const auth = useAuthStore();

const handleLogin = async () => {
  try {
    const ret = await login(id.value, password.value);
    console.log(ret);
    // console.log(route.query.redirect);
    auth.setAuthenticated(true);
    router.push("/");
  } catch {
    error.value = "ID or password incorrect";
  }
};

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
        <div class="flex flex-col gap-3">
          <div
            class="bg-[#FEE500] text-black font-semibold py-2 rounded-xl text-center hover:bg-[#ffd900] hover:scale-[1.02] transition-transform cursor-pointer"
            @click="kakaoLoginHandler"
          >
            카카오로 시작하기
          </div>
          <div
            class="bg-gray-200 text-black font-semibold py-2 rounded-xl text-center hover:bg-gray-300 hover:scale-[1.02] transition-transform cursor-pointer"
            @click="googleLoginHandler"
          >
            구글로 시작하기
          </div>
        </div>
      </div>
    </div>
  </Card>
</template>
