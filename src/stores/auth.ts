import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(false);

  const setAuthenticated = (v: boolean) => {
      isAuthenticated.value = v;
      // sessionStorage.setItem("isAuthenticated", String(v));
    }

  return { isAuthenticated, setAuthenticated };
});


