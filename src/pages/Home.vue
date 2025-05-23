<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4"
  >
    <div class="text-center space-y-6 mt-20">
      <h1 class="text-5xl font-bold tracking-tight">Bango</h1>
      <p class="text-lg text-gray-600 max-w-xl mx-auto">
        임대주택 공고를 쉽고 빠르게 찾아볼 수 있는 서비스입니다. 지역, 조건,
        관심 공고까지 한눈에 확인하세요.
      </p>

      <Button size="lg" @click="goLoginPage">시작하기</Button>
    </div>

    <div class="mt-32 w-full max-w-4xl text-center space-y-10">
      <section>
        <h2 class="text-2xl font-semibold">🏠 쉽고 빠른 검색</h2>
        <p class="text-gray-600">
          다양한 필터와 지도 기반 검색으로 원하는 공고를 빠르게 찾을 수 있어요.
        </p>
      </section>
      <section>
        <h2 class="text-2xl font-semibold">❤️ 관심 공고 저장</h2>
        <p class="text-gray-600">
          마음에 드는 공고를 저장해 두고 언제든 다시 확인할 수 있어요.
        </p>
      </section>
      <section>
        <h2 class="text-2xl font-semibold">📍 내 주변 공고 확인</h2>
        <p class="text-gray-600">
          현재 위치 기반으로 가까운 임대주택 공고를 추천받을 수 있어요.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Button } from "@/components/ui/button";
import { useRouter } from "vue-router";

const router = useRouter();

const goLoginPage = () => {
  router.push("/login");
};

onMounted(() => {
  console.log(`
 _______  _______  __    _  _______  _______  __   __  
|  _    ||   _   ||  |  | ||       ||       ||  | |  | 
| |_|   ||  |_|  ||   |_| ||    ___||   _   ||  | |  | 
|       ||       ||       ||   | __ |  | |  ||  | |  | 
|  _   | |       ||  _    ||   ||  ||  |_|  ||__| |__| 
| |_|   ||   _   || | |   ||   |_| ||       | __   __  
|_______||__| |__||_|  |__||_______||_______||__| |__| 

방고를 방문하신걸 환영합니다!!
`);
});
</script>

<!-- <template>
  <div class="text-center">
    <h1 class="text-2xl font-bold">🏠 홈 페이지</h1>
    <p class="mt-4 text-gray-600">환영합니다! 이것은 메인 페이지입니다.</p>
  </div>
</template> -->
