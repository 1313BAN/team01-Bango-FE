<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Button } from "@/components/ui/button";
import { initializeMap, testMap } from "@/api/map/naverMaps";
// import SidoSelector from "./address-selector/SidoSelector.vue";
import AddressSelectorWrapper from "./address-selector/AddressSelectorWrapper.vue";

// 버튼 카운트 상태
const count = ref(0);

// 컴포넌트 마운트 시 지도 생성
onMounted(async () => {
  await nextTick();
  initializeMap();
});
</script>

<template>
  <!-- <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div> -->
  <div class="flex flex-col items-center mb-2">
    <!-- <Button class="mb-2" @click="count++"> Counter is {{ count }} </Button> -->
    <Button @click="testMap" class="mb-2">테스트</Button>
    <!-- <SidoSelector /> -->
    <AddressSelectorWrapper />
  </div>
  <div class="flex flex-col items-center mb-2">
    <div id="map" class="w-[800px] h-[600px]"></div>
  </div>
</template>

<style scoped></style>
