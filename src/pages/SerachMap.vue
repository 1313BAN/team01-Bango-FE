<script setup lang="ts">
import { ref, onMounted, nextTick, type Ref } from "vue";
import { Button } from "@/components/ui/button";
// import { initializeMap } from "@/api/map/naverMaps";

import { Card } from "@/components/ui/card";

import AddressSelectorWrapper from "@/components/address-selector/AddressSelectorWrapper.vue";
import HouseList from "@/components/searchMap/HouseList.vue";
import HouseDetail from "@/components/searchMap/HouseDetail.vue";

import {
  initializeMap,
  initializeMarker,
  setupMapEventHandlersWithZoom,
} from "@/api/map/naverMapUtil";
import { gugunCluster } from "@/api/map/sample-data/gugunCluster";
import { dongCluster } from "@/api/map/sample-data/dongCluster";
import { getRentalHouseByRegion } from "@/api/rentalhouse";

import type { RentalHouse } from "@/types/type";

const selectedHouse = ref<RentalHouse | null>(null);
const rentalHouseList = ref<RentalHouse[]>([]);

// 컴포넌트 마운트 시 지도 생성, 최초 마커 설정, 이벤트 핸들러 추가
onMounted(async () => {
  await nextTick();
  const map = initializeMap();
  initializeMarker(map, gugunCluster);
  setupMapEventHandlersWithZoom(map, gugunCluster, dongCluster);
});

const handleDongCode = async (dongcode: string) => {
  //   console.log("부모에서 받은 동코드:", dongcode);
  const rentalHouseListResponse = await getRentalHouseByRegion({
    dongCode: dongcode,
  });

  rentalHouseList.value = rentalHouseListResponse;
  console.log(rentalHouseListResponse);
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
        <div v-if="rentalHouseList.length === 0">아무것도 없음</div>
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
