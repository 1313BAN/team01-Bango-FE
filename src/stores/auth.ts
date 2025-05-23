import type { AuthToken, Member } from "@/types/type";
import { defineStore } from "pinia";
import type { PersistenceOptions } from "pinia-plugin-persistedstate";

interface AuthState {
  member: Member | null;
  token: AuthToken | null;
  isAuthenticated: boolean;
}

/**
 * 사용자 정보 전역 store
 */
export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    member: null,
    token: null,
    isAuthenticated: false,
  }),

  getters: {
    getUser: (state) => state.member,
    getAccessToken: (state) => state.token?.accessToken || null,
    getRefreshToken: (state) => state.token?.refreshToken || null,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },

  actions: {
    setAuth(memberData: Member, tokens: AuthToken) {
      this.member = memberData;
      this.token = tokens;
      this.isAuthenticated = true;
    },

    clearAuth() {
      this.member = null;
      this.token = null;
      this.isAuthenticated = false;
    },

    updateTokens(tokens: AuthToken) {
      this.token = tokens;
    },
  },

  persist: {
    key: "auth",
    storage: sessionStorage,
    paths: ["token", "isAuthenticated"],
  } as PersistenceOptions<AuthState>,
});
