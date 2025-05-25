import { AI } from "@/api/endpoint";
import api from "@/api";
// import type { ApiResponse } from "@/api/types";
import type { HouseAIRequest } from "./types";

export const generateAIFacility = async (
  req: HouseAIRequest
): Promise<string> => {
  const response = await api.get<string>(AI.GEN(req.houseId.toString()));

  console.log(response.data);

  return response.data;
};
