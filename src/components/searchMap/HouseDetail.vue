<!-- src/components/searchMap/HouseDetail.vue -->
<script setup lang="ts">
// import { defineProps, defineEmits } from "vue";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import type { RentalHouse } from "@/types/type";
import HouseStyle from "./HouseStyle.vue";
import HouseFacilityAI from "./HouseFacilityAI.vue";

const props = defineProps<{ detail: RentalHouse }>();
const emit = defineEmits(["close"]);
</script>

<template>
  <!-- 헤더 -->
  <div class="flex justify-between items-center px-2 pt-2">
    <h2 class="text-xl font-semibold ml-1">단지 기본정보</h2>
    <Button variant="ghost" class="p-3" @click="emit('close')">닫기</Button>
  </div>

  <div class="overflow-y-auto h-[calc(100vh-8rem)] rounded-md border-0">
    <div class="p-2 space-y-2">
      <!-- 사진 영역 -->
      <Card class="p-0 flex justify-center items-center max-w-80 gap-2">
        <img
          src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046795&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzM3MjRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
          alt="House preview"
          class="rounded-md w-full object-cover"
        />
      </Card>

      <!-- 기본 정보 -->
      <Card class="p-3 space-y-2 max-w-80 gap-0">
        <div class="ml-1">
          <div class="text-sm text-gray-500">주소</div>
          <div class="font-medium">{{ detail.address }}</div>
        </div>
        <table
          class="w-full text-sm border border-gray-200 rounded-lg overflow-hidden"
        >
          <tbody>
            <tr class="border-b">
              <th class="bg-gray-100 text-left font-medium px-3 py-2 w-1/3">
                주택유형
              </th>
              <td class="px-3 py-2 w-2/3">{{ detail.houseType }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 text-left font-medium px-3 py-2">
                임대유형
              </th>
              <td class="px-3 py-2">{{ detail.supplyType }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 text-left font-medium px-3 py-2">
                임대사업자
              </th>
              <td class="px-3 py-2">{{ detail.institudeType }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 text-left font-medium px-3 py-2">
                주차대수
              </th>
              <td class="px-3 py-2">{{ detail.parkingCount }}</td>
            </tr>
            <tr class="border-b">
              <th class="bg-gray-100 text-left font-medium px-3 py-2">
                승강기
              </th>
              <td class="px-3 py-2">{{ detail.hasElevator }}</td>
            </tr>
            <tr>
              <th class="bg-gray-100 text-left font-medium px-3 py-2">
                준공일자
              </th>
              <td class="px-3 py-2">{{ detail.builtAt?.substring(0, 10) }}</td>
            </tr>
          </tbody>
        </table>
      </Card>

      <!-- AI 주변 시설 분석 -->
      <HouseFacilityAI :detail="props.detail" :houseId="props.detail.houseId" />

      <!-- 기타 상세 정보 -->
      <HouseStyle :house-styles="props.detail.styles" />
    </div>
  </div>
</template>
