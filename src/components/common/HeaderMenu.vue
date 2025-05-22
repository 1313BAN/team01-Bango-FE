<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref } from "vue";
import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useAuthStore } from "@/stores/auth";

// import { logout } from "@/api/auth/auth";

const router = useRouter();
const auth = useAuthStore();

async function handleLogout() {
  // await logout();
  auth.setAuthenticated(false);
  router.push("/");
}
const go = (path: string) => {
  router.push(path);
};
</script>

<template>
  <header>
    <Menubar class="border-b px-4 py-6 justify-between flex fixed w-screen">
      <!-- 왼쪽 영역 -->
      <div class="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger class="text-2xl font-serif" @click="go('/')"
            >BANGO</MenubarTrigger
          >
        </MenubarMenu>
      </div>

      <!-- 오른쪽 영역 -->
      <div class="flex space-x-4">
        <MenubarMenu>
          <MenubarTrigger @click="go('/map')">검색하기</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger @click="go('/notice')">공고보기</MenubarTrigger>
        </MenubarMenu>

        <MenubarMenu v-if="!auth.isAuthenticated">
          <MenubarTrigger @click="go('/login')">로그인</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu v-if="!auth.isAuthenticated">
          <MenubarTrigger @click="go('/profile')">마이페이지</MenubarTrigger>
        </MenubarMenu>
        <MenubarMenu v-if="auth.isAuthenticated">
          <MenubarTrigger @click="go('/profile')">마이페이지</MenubarTrigger>
          <MenubarTrigger @click="handleLogout">로그아웃</MenubarTrigger>
        </MenubarMenu>
      </div>
    </Menubar>
  </header>
</template>
