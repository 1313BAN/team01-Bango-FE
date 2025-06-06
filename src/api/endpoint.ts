export const MEMBER = {
  TOKEN: "/api/v1/member/token",
  LOGIN: "/api/v1/member/login",
  LOGOUT: "/api/v1/member/logout",
  ME: "/api/v1/member/me",
  REFRESH: "/api/v1/member/refresh",
};

export const DONGCODE = {
  SIDO: "/api/v1/dongcode/sido",
  GUGUN: "/api/v1/dongcode/gugun",
  DONG: "/api/v1/dongcode/dong",
};

export const HOUSE = {
  ALL: "/api/v1/rental",
  ONE: (houseId: string) => `/api/v1/rental/${houseId}`,
  BY_REGION: "/api/v1/rental/by-region",
};

export const NOTICE = {
  ALL: "/api/v1/notice",
  ALL_LIKED: "/api/v1/notice/like",
  ONE: (noticeId: number) => `/api/v1/notice/p/${noticeId}`,
  DUMP: "/api/v1/notice/p/dump",
  LIKED: "/api/v1/like/notice/liked",
  LIKE: (noticeId: number) => `/api/v1/like/notice/${noticeId}`,
};

export const AI = {
  GEN: (houseId: string) => `/api/v1/ai/rental/${houseId}/facilities`,
};

export const MAP = {
  GUGUN: "/api/v1/rental/gugun",
  DONG: "/api/v1/rental/dong",
  WITHIN_BOUNDS: "/api/v1/rental/within-bounds",
};
