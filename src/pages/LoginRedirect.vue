<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";

import { getSoicalAccessToken } from "@/api/member";

onMounted(async () => {
  const route = useRoute();
  const socialPlatform = route.params.socialPlatform.toString().toUpperCase();
  // console.log("[소셜 로그인]" + socialPlatform);

  const AUTHORIZATION_CODE = new URL(window.location.href).searchParams.get(
    "code"
  );
  // console.log("Authorization code:", AUTHORIZATION_CODE);

  const socialAccessToken = await getSoicalAccessToken({
    socialPlatform: socialPlatform,
    code: AUTHORIZATION_CODE!,
  });
  console.log(socialAccessToken);

  // const socialToken = await getLoginToken(socialPlatform);
  // console.log(socialToken);

  // console.log(socialPlatform.toUpperCase());

  // const tokenDto = await postLogin(socialPlatform.toUpperCase(), socialToken);
  // console.log(tokenDto);
});
</script>

<template lang="">
  <div></div>
</template>
