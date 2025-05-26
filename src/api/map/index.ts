import { MAP } from "@/api/endpoint";
import api from "@/api";
import type { ApiResponse } from "@/api/types";
import type { DongMapItem, GugunMapItem, RentalHouse } from "@/types/type";
import type { BoundsRequest } from "@/api/map/types";

export const getGugunSummary = async (): Promise<GugunMapItem[]> => {
  const response = await api.get<ApiResponse<GugunMapItem[]>>(MAP.GUGUN);

  console.log(response.data.data);

  return response.data.data;
};

export const getDongSummary = async (): Promise<DongMapItem[]> => {
  const response = await api.get<ApiResponse<DongMapItem[]>>(MAP.DONG);

  console.log(response.data.data);

  return response.data.data;
};

export const getRentalHouseWithinBounds = async (
  req: BoundsRequest
): Promise<RentalHouse[]> => {
  const response = await api.get<ApiResponse<RentalHouse[]>>(
    MAP.WITHIN_BOUNDS,
    {
      params: req,
    }
  );

  // console.log(response.data.data);

  return response.data.data;
};
