// src/stores/auth.ts
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    isAuthenticated: false as boolean,
  }),
  actions: {
    setAuthenticated(v: boolean) {
      this.isAuthenticated = v;
      sessionStorage.setItem("isAuthenticated", String(v));
    },
  },
});
