import { HOUSE } from "@/api/endpoint";
import api from "@/api";
import type { ApiResponse } from "@/api/types";
import type {
  ByIdRequest,
  ByRegionRequest,
  RentalHouseListResponse,
  RentalHouseResponse,
} from "@/api/rentalhouse/types";

// dongCode로 RentalHouse 조회하는 함수
export const getRentalHouseByRegion = async (
  req: ByRegionRequest
): Promise<RentalHouseListResponse> => {
  const response = await api.get<ApiResponse<RentalHouseListResponse>>(
    HOUSE.BY_REIGON,
    {
      params: req,
    }
  );

  return response.data.data;
};

// houseId로 RentalHouse 조회하는 함수
export const getRentalHouseById = async (
  req: ByIdRequest
): Promise<RentalHouseResponse> => {
  const response = await api.get<ApiResponse<RentalHouseResponse>>(
    HOUSE.ONE(req.houseId)
  );

  console.log(response.data);

  return response.data.data;
};
