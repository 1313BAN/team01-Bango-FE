import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";

import Home from "@/pages/Home.vue";
import Login from "@/pages/Login.vue";
import LoginRedirect from "@/pages/LoginRedirect.vue";
import MyPage from "@/pages/MyPage.vue";
import SearchMap from "@/pages/SerachMap.vue";
import NoticeListPage from '@/pages/NoticeListPage.vue'
import NoticeDetailPage from '@/pages/NoticeDetailPage.vue'

const routes = [
  { path: "/", component: Home },
  {
    path: "/login",
    name: 'Login',
    component: Login,
    // meta: { hideLayout: true }, // <- Menubar/Footer 숨기기 설정
  },
  {
    path: "/map",
    component: SearchMap,
    meta: { requiresAuth: false, hideLayout: true },
  },
  { path: "/profile", component: MyPage, meta: { requiresAuth: true } },
  {
    path: "/auth/:socialPlatform/redirect",
    component: LoginRedirect,
  },

  { path: '/notice',
    name: 'NoticeListPage',
    component: NoticeListPage
  },
  { path: '/notice/:id',
    name: 'NoticeDetail',
    component: NoticeDetailPage,
    props: true
  },

  {
    path: "/:pathMatch(.*)*",
    component: () => import("@/pages/NotFound.vue"),
  },
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
