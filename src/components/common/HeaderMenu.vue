<script setup lang="ts">
import { useRouter } from "vue-router";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Button } from "@/components/ui/button";
import BangoLogo from "@/assets/bango-logo.png";

import { useAuthStore } from "@/stores/auth";

import { logout } from "@/api/member";

const router = useRouter();
const auth = useAuthStore();

async function handleLogout() {
  try {
    await logout();
  } finally {
    auth.clearAuth();
  }
  router.push("/");
}
const go = (path: string) => {
  router.push(path);
};
</script>

<template>
  <header>
    <Menubar class="border-b px-4 py-8 justify-between flex fixed w-screen">
      <!-- 왼쪽 영역 -->
      <div class="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger @click="go('/')">
            <img :src="BangoLogo" class="h-14"
          /></MenubarTrigger>
        </MenubarMenu>
      </div>

      <!-- 오른쪽 영역 -->
      <div class="flex">
        <MenubarMenu>
          <Button variant="ghost" @click="go('/map')">검색하기</Button>
        </MenubarMenu>
        <MenubarMenu>
          <Button variant="ghost" @click="go('/notice')">공고보기</Button>
        </MenubarMenu>

        <MenubarMenu v-if="!auth.isAuthenticated">
          <Button variant="ghost" @click="go('/login')">로그인</Button>
        </MenubarMenu>
        <MenubarMenu v-if="auth.isAuthenticated">
          <Button variant="ghost" @click="go('/profile')">마이페이지</Button>
        </MenubarMenu>
        <MenubarMenu v-if="auth.isAuthenticated">
          <Button variant="ghost" @click="handleLogout">로그아웃</Button>
        </MenubarMenu>
      </div>
    </Menubar>
  </header>
</template>
