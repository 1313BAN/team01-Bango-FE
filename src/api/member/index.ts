import { MEMBER } from "@/api/endpoint";
import api from "@/api";
import type { ApiResponse } from "@/api/types";
import type {
  SocialTokenRequest,
  LoginRequest,
  LoginResponse,
} from "@/api/member/types";

export const getSocialAccessToken = async (
  req: SocialTokenRequest
): Promise<string> => {
  const response = await api.post<ApiResponse<string>>(MEMBER.TOKEN, req);

  return response.data.data;
};

export const login = async (req: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<ApiResponse<LoginResponse>>(
    MEMBER.LOGIN,
    req
  );

  return response.data.data;
};
