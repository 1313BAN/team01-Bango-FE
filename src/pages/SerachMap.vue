<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";

import { Card } from "@/components/ui/card";

import AddressSelectorWrapper from "@/components/address-selector/AddressSelectorWrapper.vue";
import HouseList from "@/components/searchMap/HouseList.vue";
import HouseDetail from "@/components/searchMap/HouseDetail.vue";

import {
  initializeMap,
  initializeMarker,
  setupMapEventHandlersWithZoom,
  moveMapToDong,
} from "@/api/map/naverMapUtil";
// import { gugunCluster } from "@/api/map/sample-data/gugunCluster";
// import { dongCluster } from "@/api/map/sample-data/dongCluster";
import { getRentalHouseByRegion } from "@/api/rentalhouse";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";

import type { DongMapItem, GugunMapItem, RentalHouse } from "@/types/type";
import { getDongSummary, getGugunSummary } from "@/api/map";

const selectedHouse = ref<RentalHouse | null>(null);
const rentalHouseList = ref<RentalHouse[]>([]);

const gugunCluster = ref<GugunMapItem[]>();
const dongCluster = ref<DongMapItem[]>();

const loadData = async () => {
  gugunCluster.value = await getGugunSummary();
  dongCluster.value = await getDongSummary();
};

let map: any;
// 컴포넌트 마운트 시 지도 생성, 최초 마커 설정, 이벤트 핸들러 추가
onMounted(async () => {
  await nextTick();
  map = initializeMap();

  await loadData();

  initializeMarker(map, gugunCluster.value!);
  setupMapEventHandlersWithZoom(
    map,
    gugunCluster.value!,
    dongCluster.value!,
    (list) => {
      rentalHouseList.value = list;
      console.log(list);
    },
    (house) => {
      selectedHouse.value = house; // ✅ 클릭 시 디테일 열기
    }
  );
});

const handleDongCode = async (dongcode: string) => {
  //   console.log("부모에서 받은 동코드:", dongcode);
  const rentalHouseListResponse = await getRentalHouseByRegion({
    dongCode: dongcode,
  });

  rentalHouseList.value = rentalHouseListResponse;
  console.log(rentalHouseListResponse);

  if (map && dongCluster.value) {
    moveMapToDong(map, dongCluster.value, dongcode);
  }
};

const handleSelectHouse = (house: RentalHouse) => {
  console.log(house);
  selectedHouse.value = house;
};

const handleCloseDetail = () => {
  selectedHouse.value = null;
};
</script>

<template>
  <div class="flex relative">
    <!-- 지도 -->
    <div id="map" class="w-full h-[calc(100vh-4rem)] z-0"></div>

    <!-- 좌측: HouseList + HouseDetail 를 지도 위에 띄우기 -->
    <div class="absolute top-0 left-0 z-10 flex h-full">
      <!-- HouseList -->
      <Card class="flex flex-col py-1 px-1 gap-1 min-w-80 max-w-80">
        <div class="py-2">
          <AddressSelectorWrapper @selectDongCode="handleDongCode" />
        </div>
        <div
          v-if="rentalHouseList.length === 0"
          class="flex flex-col items-center justify-center h-full px-4 text-center text-sm text-gray-700"
        >
          <DotLottieVue
            style="height: 10rem; width: 10rem"
            autoplay
            loop
            src="https://lottie.host/aa14c754-9aaf-4f6d-8cc9-f8946cbcdd61/85ItBFrOt3.lottie"
          />
          <div class="flex flex-col gap-1">
            <p>주소로 검색</p>
            <p>또는</p>
            <p>지도를 선택하여</p>
            <p>임대주택을 조회하세요!</p>
          </div>

          <div class="h-50"></div>
        </div>
        <HouseList
          v-else
          @selectHouse="handleSelectHouse"
          :rentalList="rentalHouseList"
        />
      </Card>

      <!-- HouseDetail: slide-in 애니메이션 포함 -->
      <Transition name="slide-in-right">
        <div
          v-if="selectedHouse"
          class="w-80 bg-white rounded-2xl border-r-1 border-y-1"
        >
          <HouseDetail :detail="selectedHouse" @close="handleCloseDetail" />
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* slide from left → right */
.slide-in-right-enter-active {
  transition: all 0.2s ease-out;
}
.slide-in-right-leave-active {
  transition: all 0.2s ease-in;
}
.slide-in-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-in-right-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-in-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-in-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
