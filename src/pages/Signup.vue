<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { signup } from "@/api/auth";

import { Card, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const router = useRouter();
const id = ref("");
const password = ref("");
const confirm = ref("");
const email = ref("");
const error = ref("");

const handleSubmit = async () => {
  if (password.value !== confirm.value) {
    error.value = "Passwords do not match";
    return;
  }
  try {
    await signup({
      id: id.value,
      password: password.value,
      email: email.value,
    });
    router.push("/login");
  } catch {
    error.value = "Sign up failed";
  }
};
</script>

<template>
  <Card class="max-w-md mx-auto p-6 mt-10">
    <CardTitle>Sign Up</CardTitle>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <Label class="mb-1">ID</Label>
        <Input v-model="id" placeholder="Enter your ID" />
      </div>
      <div>
        <Label class="mb-1">Password</Label>
        <Input type="password" v-model="password" />
      </div>
      <div>
        <Label class="mb-1">Confirm Password</Label>
        <Input type="password" v-model="confirm" />
      </div>
      <div>
        <Label class="mb-1">Email</Label>
        <Input type="email" v-model="email" />
      </div>
      <div v-if="error" class="text-red-500">{{ error }}</div>
      <Button type="submit">Sign Up</Button>
    </form>
  </Card>
</template>
