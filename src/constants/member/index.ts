const VUE_URL = import.meta.env.VITE_VUE_URL;

const KAKAO_BASE_URL = "https://kauth.kakao.com/oauth";
const KAKAO_REDIRECT_URI = `${VUE_URL}/auth/kakao/redirect`;
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;

const GOOGLE_COED_BASE_URL = "https://accounts.google.com/o/oauth2/v2";
const GOOGLE_REDIRECT_URI = `${VUE_URL}/auth/google/redirect`;
const GOOGLE_REST_API_KEY = import.meta.env.VITE_GOOGLE_REST_API_KEY;

export const KAKAO_CODE_REQ_URL = `${KAKAO_BASE_URL}/authorize?response_type=code&client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}`;

export const GOOGLE_CODE_REQ_URL = `${GOOGLE_COED_BASE_URL}/auth?scope=https://www.googleapis.com/auth/userinfo.email&response_type=code&redirect_uri=${GOOGLE_REDIRECT_URI}&client_id=${GOOGLE_REST_API_KEY}`;
