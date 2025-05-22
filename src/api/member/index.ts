import { MEMBER } from "@/api/endpoint";
import api from "@/api";
import type { ApiResponse } from "@/api/types";
import type { SocialTokenRequest } from "@/api/member/types";

export const getSoicalAccessToken = async (
  req: SocialTokenRequest
): Promise<string> => {
  const response = await api.post<ApiResponse<string>>(MEMBER.TOKEN, req);

  return response.data.data;
};
