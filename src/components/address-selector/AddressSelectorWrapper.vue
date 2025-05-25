<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { DongCode } from "@/types/type";
import { getGugunList, getDongList } from "@/api/dongcode";

import GugunSelector from "./GugunSelector.vue";
import DongSelector from "./DongSelector.vue";

// 선택된 값
const selectedSido = ref<string | null>("서울특별시");
const selectedGugun = ref<string | null>(null);
const selectedDong = ref<string | null>(null);

// 리스트
const sidoName = "서울특별시";
const gugunList = ref<string[]>([]);
const dongList = ref<DongCode[]>([]);

// emit
const emit = defineEmits<{
  (e: "selectDongCode", dongCode: string): void;
}>();

// 구/군 선택시
const handleGugunChange = async (gugun: string) => {
  selectedGugun.value = gugun;
  selectedDong.value = null;
  dongList.value = [];

  const gugunName =
    gugunList.value.find((item) => item === selectedGugun.value) || "";

  // console.log(sidoName, gugunName);
  if (selectedSido.value && gugunName) {
    dongList.value = await getDongList(sidoName, gugunName);
  }
};

// 동 선택시
const handleDongChange = (dongName: string) => {
  selectedDong.value = dongName;
  console.log(
    `최종 선택된 주소 코드: ${selectedGugun.value} ${selectedDong.value}`
  );

  const dongcode = dongList.value.find(
    (item) =>
      item.dongName === selectedDong.value &&
      item.gugunName === selectedGugun.value
  )?.dongCode;
  if (dongcode != null) {
    console.log(dongcode);
    // 부모 컴포넌트로 dongcode를 넘기는 작업
    emit("selectDongCode", dongcode);
  }
};

// mount 시 최초 시도 리스트 가져오기
onMounted(async () => {
  gugunList.value = await getGugunList("서울특별시");
});
</script>

<template>
  <div class="flex gap-2 justify-center items-center">
    <GugunSelector
      :list="gugunList"
      :selected="selectedGugun"
      @select="handleGugunChange"
      :disabled="!selectedSido"
    />
    <DongSelector
      :list="dongList"
      :selected="selectedDong"
      @select="handleDongChange"
      :disabled="!selectedGugun"
    />
  </div>
</template>
