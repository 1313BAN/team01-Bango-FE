<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import type { RentalHouseStyle } from "@/types/type";

const props = defineProps<{
  houseStyles: RentalHouseStyle[];
}>();
</script>

<template>
  <Carousel class="relative w-full min-w-72">
    <!-- <div class="text-center font-mono font-bold">임대주택유형</div> -->
    <CarouselContent>
      <CarouselItem v-for="style in props.houseStyles" :key="style.styleId">
        <Card class="flex flex-col gap-2 p-4">
          <CardContent class="flex flex-col gap-2">
            <h3 class="font-bold">임대주택 유형: {{ style.styleName }}</h3>
            <!-- <p class="text-sm text-gray-600">{{ style.buildStyle }}22</p> -->
            <div class="text-sm">
              전용면적: {{ style.supplyPrivateArea }}㎡<br />
              공용면적: {{ style.supplyPublicArea }}㎡
            </div>
            <div class="text-sm">
              보증금: {{ style.baseDeposit.toLocaleString() }}원<br />
              월세: {{ style.baseMonthlyRent.toLocaleString() }}원<br />
              전환보증금: {{ style.baseConversionDeposit.toLocaleString() }}원
            </div>
          </CardContent>
        </Card>
      </CarouselItem>
    </CarouselContent>

    <CarouselPrevious class="absolute left-1/65" />
    <CarouselNext class="absolute bottom-12 right-1/65" />
  </Carousel>
</template>
