import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import LoginRedirect from "@/pages/LoginRedirect.vue";
import MyPage from "@/pages/MyPage.vue";
import SerachMap from "@/pages/SerachMap.vue";

const routes = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
    // meta: { hideLayout: true }, // <- Menubar/Footer 숨기기 설정
  },
  {
    path: "/map",
    component: SerachMap,
    meta: { requiresAuth: false, hideLayout: true },
  },
  { path: "/profile", component: MyPage, meta: { requiresAuth: true } },
  {
    path: "/auth/:socialPlatform/redirect",
    component: LoginRedirect,
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFound.vue"),
  },
  // {
  //   path: "/testMap",
  //   component: SerachMap,
  //   meta: { hideLayout: true },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 인증 여부 확인
router.beforeEach((to, from, next) => {
  const auth = useAuthStore();
  const isAuthenticated = auth.getIsAuthenticated;
  // console.log(isAuthenticated);
  // accessToken으로 api 호출해서 확인
  if (to.meta.requiresAuth && !isAuthenticated) {
    return next("/login");
  }
  next();
});

export default router;
