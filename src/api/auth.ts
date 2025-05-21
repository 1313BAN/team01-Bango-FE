import apiClient from "@/api/apiClient";

export interface SignupPayload {
  id: string;
  password: string;
  email: string;
}

export function signup(data: SignupPayload) {
  return apiClient.post("/auth/signup", data);
}

export function login(id: string, password: string) {
  const form = new FormData();
  form.set("id", id);
  form.set("password", password);

  return apiClient.post("/auth/login", form, {
    withCredentials: true,
  });
}

export function logout() {
  return apiClient.post("/auth/logout");
}
