import type { RentalHouse } from "@/types/type";

export type ByIdRequest = {
  houseId: string;
};

export type ByRegionRequest = {
  dongCode: string;
};

export type RentalHouseListResponse = RentalHouse[];

export type RentalHouseResponse = RentalHouse;
