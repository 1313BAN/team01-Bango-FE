import type { DongCode } from "@/types/DongCode";

// 공통 fetch 유틸 함수 (에러처리 포함하고 싶으면 추가 가능)
import apiClient from "./apiClient";

// 시도 리스트 가져오기
export async function fetchSidoList() {
  const response = await apiClient.get<DongCode[]>("dongcode/sido");

  console.log(response);

  return response.data;
}

// 구군 리스트 가져오기
export async function fetchGugunList(sidoName: string) {
  const response = await apiClient.get<DongCode[]>(
    `/dongcode/gugun?sidoName=${encodeURIComponent(sidoName)}`
  );

  return response.data;
}

// 동 리스트 가져오기
export async function fetchDongList(sidoName: string, gugunName: string) {
  const response = await apiClient.get<DongCode[]>(
    `/dongcode/dong?sidoName=${encodeURIComponent(
      sidoName
    )}&gugunName=${encodeURIComponent(gugunName)}`
  );

  return response.data;
}
