import { DONGCODE } from "../endpoint";
import api from "@/api";

import type { DongCode } from "@/types/type";

// 시도 리스트 가져오기
export const getSidoList = async () => {
  const response = await api.get<string[]>(DONGCODE.SIDO);
  // console.log(response.data);
  return response.data;
};

// 구군 리스트 가져오기
export const getGugunList = async (sidoName: string) => {
  const response = await api.get<string[]>(
    `${DONGCODE.GUGUN}?sidoName=${encodeURIComponent(sidoName)}`
  );

  return response.data;
};

// 동 리스트 가져오기
export const getDongList = async (sidoName: string, gugunName: string) => {
  const response = await api.get<DongCode[]>(
    `${DONGCODE.DONG}?sidoName=${encodeURIComponent(
      sidoName
    )}&gugunName=${encodeURIComponent(gugunName)}`
  );

  return response.data;
};
