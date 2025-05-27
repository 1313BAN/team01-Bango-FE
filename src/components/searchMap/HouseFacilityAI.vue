<script setup lang="ts">
import { ref, watch } from "vue";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2Icon } from "lucide-vue-next";
import { DotLottieVue } from "@lottiefiles/dotlottie-vue";
import MarkdownIt from "markdown-it";
import type { RentalHouse } from "@/types/type";

import { generateAIFacility } from "@/api/ai";

const props = defineProps<{ detail: RentalHouse; houseId: number }>();

const md = new MarkdownIt();
const aiFacility = ref<string | null>(null);
const loading = ref(false);

const generateaiFacility = async () => {
  loading.value = true;

  // 실제 API 호출이나 처리 지연 시뮬레이션
  try {
    aiFacility.value = await generateAIFacility({
      houseId: props.houseId,
    });
  } catch (error) {
    console.error("AI 시설 분석 생성 중 오류 발생:", error);
    aiFacility.value =
      "### 시설 분석을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.";
  }

  loading.value = false;
};

// ✅ props.detail 변경되면 aiFacility 초기화
watch(
  () => props.detail,
  () => {
    aiFacility.value = null;
  },
  { deep: true }
);
</script>

<template>
  <Card
    class="p-2 flex flex-col space-y-3 max-w-96 rounded-2xl border shadow-sm transition hover:shadow-md gap-0"
  >
    <Button
      variant="outline"
      :disabled="!!aiFacility || loading"
      @click="generateaiFacility"
      class="flex items-center justify-center gap-2 hover:bg-gray-50"
    >
      <Loader2Icon v-if="loading" class="animate-spin w-4 h-4" />
      <span class="text-[#1F2937]">
        {{ aiFacility ? "AI 주변시설 분석" : "AI 주변시설 분석 생성하기" }}
      </span>
    </Button>
    <template v-if="aiFacility">
      <div
        v-html="md.render(aiFacility)"
        class="prose prose-sm max-w-full bg-gray-50 text-gray-800 p-4 rounded-xl border border-gray-200 [&_p]:text-xs [&_li]:text-xs [&_h2]:text-base [&_h3]:text-sm"
      ></div>
    </template>
    <div v-if="loading" class="flex justify-center items-center">
      <DotLottieVue
        autoplay
        loop
        style="height: 6rem; width: 6rem"
        src="https://lottie.host/169571d8-dde8-48a2-aa5c-049d6eaa107f/HueWTxlawe.lottie"
        class="my-4"
      />
    </div>
  </Card>
</template>
