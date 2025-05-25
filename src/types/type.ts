// 데이터 타입
export type DongCode = {
  dongCode: string;
  sidoName: string;
  gugunName: string;
  dongName: string;
};

export type AuthToken = {
  accessToken: string;
  refreshToken: string;
};

export type Member = {
  name: string;
  email: string;
  socialPlatform: string;
};

export type RentalItem = {
  id: number;
  address: string;
  detail: string;
  houseType: string;
  rentalType: string;
};

export type HouseDetail = {
  address: string;
  detail: string;
  houseType: string;
  rentalType: string;
  householdCount: string;
  parkingSpaces: string;
  lessor: string;
};

export type GugunMapItem = {
  gugunName: string;
  houseCount: number;
  lat: number;
  long: number;
  nextZoomLevel: number;
};

export type DongMapItem = {
  dongName: string;
  houseCount: number;
  lat: number;
  long: number;
};

export type RentalHouseStyle = {
  styleId: number;
  buildStyle: string;
  baseDeposit: number;
  baseMonthlyRent: number;
  baseConversionDeposit: number;
  styleName: string;
  supplyPrivateArea: number;
  supplyPublicArea: number;
};

export type RentalHouse = {
  houseId: number;
  institudeType: string;
  sidoCode: number;
  sidoName: string;
  gugunCode: number;
  gugunName: string;
  address: string;
  pnu: string;
  builtAt: string;
  supplyType: string;
  houseType: string;
  hasElevator: string;
  parkingCount: string;
  latitude: string;
  longitude: string;
  styles: RentalHouseStyle[];
};
