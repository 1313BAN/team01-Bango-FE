<template lang="">
  <div></div>
</template>
<script>
import { useRoute } from "vue-router";

// import { getLoginToken } from "../api/getLoginToken";
// import { postLogin } from "../api/postLogin";

export default {
  async mounted() {
    const route = useRoute();
    const socialPlatform = route.params.socialPlatform;

    console.log("[소셜 로그인]" + socialPlatform);
    const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get(
      "code"
    );

    console.log(AUTHORIZE_CODE);
    // const socialToken = await getLoginToken(socialPlatform);
    // console.log(socialToken);

    // console.log(socialPlatform.toUpperCase());

    // const tokenDto = await postLogin(socialPlatform.toUpperCase(), socialToken);
    // console.log(tokenDto);
  },
};
</script>
<style lang=""></style>
