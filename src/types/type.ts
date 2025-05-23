// 데이터 타입
export type DongCode = {
  dongCode: string;
  sidoName: string;
  gugunName: string;
  dongName: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type Member = {
  name: string;
  email: string;
  socialPlatform: string;
};
