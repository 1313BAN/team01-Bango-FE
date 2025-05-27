<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  InstagramIcon,
  FacebookIcon,
  BookTextIcon,
  YoutubeIcon,
} from "lucide-vue-next";

import { getRentalHouseById, getRentalHouseByRegion } from "@/api/rentalhouse";

const easterEgg = () => {
  // getRentalHouseById({
  //   houseId: "401155",
  // });

  getRentalHouseByRegion({
    dongCode: "1174010500",
  });
};
</script>

<template>
  <footer class="bg-[#2d2d2d] text-gray-300 border-t border-gray-700 py-8 px-4">
    <div
      class="max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between gap-4"
    >
      <!-- 회사 정보 -->
      <div class="flex-1 space-y-1 text-left">
        <div class="font-semibold text-base">(주)Bango (SSAFY)</div>
        <div class="text-xs">대표 : lyr</div>
        <div class="text-xs">
          주소 : 서울 강남구 테헤란로 212 멀티캠퍼스 601 (주)Bango
        </div>
        <div class="text-xs">
          고객센터 :
          <span class="font-medium text-xs">02-1111-2222</span>
          | 평일 10:00 ~ 18:30, 점심 12:30 ~ 13:30 (토/일, 공휴일 휴무)
        </div>
        <div class="text-xs">
          프로모션/사업 제휴 문의 :
          <a
            href="mailto:biz@station3.co.kr"
            class="underline hover:text-blue-300"
            >bango@edu.ssafy.com</a
          >
        </div>
      </div>
      <!-- 버튼 영역 -->
      <div class="flex flex-col gap-3 items-start md:items-end min-w-[200px]">
        <div class="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            class="border-gray-500 text-gray-500 px-4 text-xs"
            @click="easterEgg"
            >자주묻는질문
          </Button>
          <Button
            variant="default"
            size="sm"
            class="px-4 bg-indigo-600 text-white hover:bg-indigo-700 text-xs"
            @click="throw Error();"
          >
            1:1문의
          </Button>
        </div>
        <!-- SNS 아이콘 -->
        <div class="flex gap-3 mt-4">
          <a href="#" aria-label="instagram"
            ><InstagramIcon class="w-7 h-7 hover:text-pink-400"
          /></a>
          <a href="#" aria-label="facebook"
            ><FacebookIcon class="w-7 h-7 hover:text-blue-400"
          /></a>
          <a href="#" aria-label="blog"
            ><BookTextIcon class="w-7 h-7 hover:text-green-400"
          /></a>
          <a href="#" aria-label="youtube"
            ><YoutubeIcon class="w-7 h-7 hover:text-red-400"
          /></a>
        </div>
      </div>
    </div>
    <div class="text-center text-gray-500 text-[11px] mt-8">
      ⓒ 2025 BANGO LYR JJY. All rights reserved.
    </div>
  </footer>
</template>
