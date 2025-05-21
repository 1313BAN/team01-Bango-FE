<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useAuthStore } from "@/stores/auth";

import { logout } from "@/api/auth";

const router = useRouter();
const auth = useAuthStore();

async function handleLogout() {
  await logout();
  auth.setAuthenticated(false);
  router.push("/");
}
const go = (path: string) => {
  router.push(path);
};
</script>

<template>
  <header>
    <Menubar class="border-b bg-gray-100 px-4 py-2 justify-between flex">
      <!-- 왼쪽 영역 -->
      <div class="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger @click="go('/')">메인페이지</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger @click="go('/test')">검색하기</MenubarTrigger>
        </MenubarMenu>
      </div>

      <!-- 오른쪽 영역 -->
      <div class="flex space-x-4">
        <MenubarMenu v-if="!auth.isAuthenticated">
          <MenubarTrigger @click="go('/login')">로그인</MenubarTrigger>
          <MenubarTrigger @click="go('/login')">회원가입</MenubarTrigger>
          <MenubarTrigger @click="go('/profile')">마이페이지</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu v-else>
          <MenubarTrigger @click="go('/profile')">마이페이지</MenubarTrigger>
          <MenubarTrigger @click="handleLogout">로그아웃</MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  </header>
</template>
