<script setup lang="ts">
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

import { useRouter } from "vue-router";
import { Star, Home, ArrowLeft } from "lucide-vue-next";
// import { HeroBackground } from '@/components/background';

const router = useRouter();

function goHome(): void {
  router.push("/");
}

function goBack(): void {
  if (window.history.length > 1) {
    router.go(-1);
  } else {
    router.push("/");
  }
}

//TODO: 버튼 컴포넌트화
</script>

<template>
  <div class="relative min-h-screen overflow-hidden bg-[#ECF0F1]">
    <!-- 404 Container -->
    <div
      class="relative z-10 flex min-h-screen flex-col items-center justify-center px-4"
    >
      <!-- 404 Animation -->
      <div class="mb-8 text-center">
        <div
          class="mb-6 text-9xl font-bold text-gray-700/90 transition-all duration-1000"
        >
          <DotLottieVue
            style="height: 500px; width: 500px"
            autoplay
            loop
            src="https://lottie.host/4c58ca19-6e7a-4adb-9711-5d54a4021b6e/S0AqqzAC3v.lottie"
          />
        </div>

        <!-- Stars decoration -->
        <div class="relative">
          <Star
            class="absolute -top-4 -left-16 h-6 w-6 animate-pulse text-yellow-400 delay-[2500ms]"
          />
          <Star
            class="absolute -top-8 -right-12 h-4 w-4 animate-pulse text-purple-300 delay-1000"
          />
          <Star
            class="absolute top-12 -left-20 h-5 w-5 animate-pulse text-blue-400 delay-[2000ms]"
          />
          <Star
            class="absolute top-8 -right-24 h-3 w-3 animate-pulse text-pink-400 delay-[1500ms]"
          />
        </div>
      </div>

      <!-- Content -->
      <div class="text-center transition-all delay-300 duration-1000">
        <!-- <h1 class="mb-4 text-4xl font-bold text-white md:text-5xl">
          길을 잃었군요
        </h1> -->
        <p class="mb-2 text-lg text-gray-500/80 md:text-xl">
          이 페이지는 어딘가에 있는 것 같습니다
        </p>
        <p class="mb-12 text-gray-600/60">페이지를 찾을 수 없습니다..</p>

        <!-- Action Buttons -->
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            class="group flex items-center justify-center gap-2 rounded-xl bg-gray-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-purple-500 focus:ring-4 focus:ring-purple-600/20 focus:outline-none active:scale-95"
            @click="goHome"
          >
            <Home class="h-5 w-5 transition-transform group-hover:scale-110" />
            <span>홈으로 돌아가기</span>
          </button>

          <button
            class="group flex items-center justify-center gap-2 rounded-xl border-2 border-gray-500/50 px-8 py-4 font-semibold text-gray-500 transition-all duration-300 hover:scale-105 hover:border-purple-400 hover:bg-purple-400/10 focus:ring-4 focus:ring-purple-400/20 focus:outline-none active:scale-95"
            @click="goBack"
          >
            <ArrowLeft
              class="h-5 w-5 transition-transform group-hover:-translate-x-1"
            />
            <span>이전 페이지로</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
