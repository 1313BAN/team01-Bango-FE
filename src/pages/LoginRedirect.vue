<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import { getSocialAccessToken, login } from "@/api/member";
import type { LoginResponse } from "@/api/member/types";

import { Card, CardContent } from "@/components/ui/card";
import { LoaderCircleIcon } from "lucide-vue-next";

onMounted(async () => {
  const route = useRoute();
  const router = useRouter();
  const auth = useAuthStore();
  const socialPlatform = route.params.socialPlatform.toString().toUpperCase();

  const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
    "code"
  );

  if (!AUTHORIZATION_CODE) {
    console.error("Authorization code is missing");
    return;
  }
  // console.log("Authorization code:", AUTHORIZATION_CODE);

  const socialAccessToken = await getSocialAccessToken({
    socialPlatform: socialPlatform,
    code: AUTHORIZATION_CODE,
  });
  // console.log(socialAccessToken);

  const { member, token }: LoginResponse = await login({
    socialPlatform: socialPlatform,
    socialAccessToken: socialAccessToken,
  });

  auth.setAuth(member, token);

  router.push("/map");
});
</script>

<template lang="">
  <div class="mt-28 flex items-center justify-center">
    <Card
      class="w-full max-w-md shadow-xl p-6 flex items-center justify-center space-x-4 gap-6"
    >
      <LoaderCircleIcon class="animate-spin w-8 h-8 text-gray-600" />
      <span class="text-xl font-semibold text-gray-800"
        >로그인 중입니다...</span
      >
    </Card>
  </div>
</template>
