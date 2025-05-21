<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { fetchProfile, withdraw } from "@/api/member";

import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const router = useRouter();
const profile = ref<{ id: string; email: string } | null>(null);

onMounted(async () => {
  const res = await fetchProfile();
  profile.value = res;
});

async function handleWithdraw() {
  await withdraw();
  router.push("/login");
}
</script>

<template>
  <Card class="max-w-md mx-auto p-6 mt-10">
    <CardTitle>Profile</CardTitle>
    <div>ID: {{ profile?.id }}</div>
    <div>Email: {{ profile?.email }}</div>
    <Button variant="destructive" @click="handleWithdraw">Withdraw</Button>
  </Card>
</template>
