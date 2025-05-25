<script setup lang="ts">
import { defineEmits } from "vue";
import { ScrollArea } from "@/components/ui/scroll-area";

import type { RentalHouse } from "@/types/type";

const props = defineProps<{
  rentalList: RentalHouse[];
}>();

const emit = defineEmits(["selectHouse"]);

const supplyTypeColorMap: Record<string, string> = {
  매입임대: "bg-green-100 text-green-700",
  전세임대: "bg-yellow-100 text-yellow-800",
  공공임대: "bg-blue-100 text-blue-700",
  행복주택: "bg-purple-100 text-purple-700",
  영구임대: "bg-pink-100 text-pink-700",
  국민임대: "bg-orange-100 text-orange-700",
  장기전세: "bg-teal-100 text-teal-700",
  임대상가: "bg-red-100 text-red-700",
  기타임대: "bg-indigo-100 text-indigo-700",
  청년임대: "bg-cyan-100 text-cyan-700",
};

const getBadgeColor = (supplyType: string): string => {
  return supplyTypeColorMap[supplyType] ?? "bg-gray-100 text-gray-600";
};
</script>

<template>
  <ScrollArea class="h-[39rem] w-full rounded-md border-0">
    <div class="px-2 space-y-1">
      <div
        v-for="item in props.rentalList"
        :key="item.houseId"
        class="p-3 transition-colors cursor-pointer bg-white hover:bg-gray-100 border-b-1"
        @click="emit('selectHouse', item)"
      >
        <span
          :class="[
            'text-xs px-2 py-0.5 rounded-full font-semibold',
            getBadgeColor(item.supplyType),
          ]"
        >
          {{ item.supplyType }}
        </span>
        <div class="text-base font-semibold mt-2">
          {{ item.sidoName }} {{ item.gugunName }}
        </div>
        <div class="text-sm text-gray-500">주소 ｜ {{ item.address }}</div>
        <div class="text-sm text-gray-500">
          주택유형 ｜ {{ item.houseType }}
        </div>
      </div>
    </div>
  </ScrollArea>
</template>
