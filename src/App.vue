<script setup lang="ts">
import { ref, onErrorCaptured } from "vue";
import { useRoute } from "vue-router";

import GlobalErrorBoundary from "@/components/global/GlobalErrorBoundary.vue";
import HeaderMenu from "@/components/common/HeaderMenu.vue";
import Footer from "@/components/common/Footer.vue";

const route = useRoute();

const hasError = ref(false);

onErrorCaptured((e) => {
  hasError.value = true;
  console.log(e);

  return false;
});
</script>

<template>
  <GlobalErrorBoundary v-if="hasError" />
  <div v-else class="flex flex-col min-h-screen">
    <!-- 상단 메뉴 -->
    <HeaderMenu />

    <!-- 메인 컨텐츠 -->
    <main class="flex-1 mt-16">
      <router-view />
    </main>

    <!-- 하단 푸터 -->
    <Footer v-if="!route.meta.hideLayout" />
  </div>
</template>

<style scoped></style>
