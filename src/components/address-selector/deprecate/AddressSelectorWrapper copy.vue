<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { DongCode } from "@/types/type";
import { getSidoList, getGugunList, getDongList } from "@/api/dongcode";
import { fetchHouseInfo } from "@/api/rentalhouse/houseInfo";

import SidoSelector from "@/components/address-selector/SidoSelector.vue";
import GugunSelector from "./GugunSelector.vue";
import DongSelector from "./DongSelector.vue";

// import AddressSelector from "./AddressSelector.vue";
import { Button } from "../../ui/button";

// 선택된 값
const selectedSido = ref<string | null>("서울특별시");
const selectedGugun = ref<string | null>(null);
const selectedDong = ref<string | null>(null);

// 리스트
// const sidoList = ref<string[]>([]);
const sidoName = "서울특별시";
const gugunList = ref<string[]>([]);
const dongList = ref<DongCode[]>([]);

// // 시/도 선택시
// const handleSidoChange = async (sido: string) => {
//   selectedSido.value = sido;
//   selectedGugun.value = null;
//   selectedDong.value = null;
//   gugunList.value = [];
//   dongList.value = [];

//   const sidoName = sidoList.value.find((item) => item === sido) || "";

//   if (sidoName) {
//     gugunList.value = await getGugunList(sidoName);
//   }
// };

// 구/군 선택시
const handleGugunChange = async (gugun: string) => {
  selectedGugun.value = gugun;
  selectedDong.value = null;
  dongList.value = [];

  // const sidoName =
  //   sidoList.value.find((item) => item === selectedSido.value) || "";
  const gugunName =
    gugunList.value.find((item) => item === selectedGugun.value) || "";

  console.log(sidoName, gugunName);
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
    // 부모 컴포넌트로 dongcode를 넘기는 작업
  }
};

// const searchHandler = async () => {
//   const dongcode = dongList.value.find(
//     (item) =>
//       item.dongName === selectedDong.value &&
//       item.gugunName === selectedGugun.value
//   )?.dongCode;

//   if (dongcode != null) {
//     const sggCd = dongcode?.substring(0, 5);
//     const umdCd = dongcode?.substring(5, 10);

//     console.log(sggCd, " ", umdCd);
//   }
// };

// mount 시 최초 시도 리스트 가져오기
onMounted(async () => {
  gugunList.value = await getGugunList("서울특별시");
});
</script>

<template>
  <div class="flex gap-2 justify-center items-center">
    <!-- <SidoSelector
      :list="sidoList"
      :selected="selectedSido"
      @select="handleSidoChange"
    /> -->
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
    <!-- <AddressSelector
      :list="sidoList"
      :selected="selectedSido"
      labelKey="sidoName"
      placeholder="시/도 선택"
      @select="handleSidoChange"
    />
    <AddressSelector
      :list="gugunList"
      :selected="selectedGugun"
      labelKey="gugunName"
      placeholder="구/군 선택"
      @select="handleGugunChange"
    />
    <AddressSelector
      :list="dongList"
      :selected="selectedDong"
      labelKey="dongName"
      placeholder="동 선택"
      @select="handleDongChange"
    /> -->
    <!-- <Button @click="searchHandler">검색하기</Button> -->
  </div>
</template>
