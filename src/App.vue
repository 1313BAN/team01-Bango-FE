<script setup lang="ts">
import { useRoute } from "vue-router";
import HeaderMenu from "@/components/common/HeaderMenu.vue";
import Footer from "@/components/common/Footer.vue";

const route = useRoute();
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <!-- 상단 메뉴 -->
    <HeaderMenu v-if="!route.meta.hideLayout" />

    <!-- 메인 컨텐츠 -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- 하단 푸터 -->
    <Footer v-if="!route.meta.hideLayout" />
  </div>
</template>

<style scoped></style>
