import type { AuthToken, Member } from "@/types/type";

export type SocialTokenRequest = {
  socialPlatform: string;
  code: string;
};

export type LoginRequest = {
  socialPlatform: string;
  socialAccessToken: string;
};

export type LoginResponse = {
  member: Member;
  token: AuthToken;
};
