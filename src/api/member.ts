import apiClient from "@/api/apiClient";

export interface UserProfile {
  id: string;
  email: string;
}

export const fetchProfile = async () => {
  const response = await apiClient.get<UserProfile>("/member/me");
  console.log(response);
  return response.data;
};

export const withdraw = async () => {
  const response = await apiClient.delete("/member");

  return response.data;
};
