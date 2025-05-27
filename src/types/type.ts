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

// export type GugunMapItem = {
//   gugunName: string;
//   houseCount: number;
//   lat: number;
//   long: number;
//   nextZoomLevel: number;
// };

// export type DongMapItem = {
//   dongName: string;
//   houseCount: number;
//   lat: number;
//   long: number;
// };

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
  latitude: number;
  longitude: number;
  styles: RentalHouseStyle[];
};

export type GugunMapItem = {
  gugunCode: string;
  gugunName: string;
  rentalCount: number;
  avgLatitude: number;
  avgLongitude: number;
  nextZoomLevel: 13;
};

export type DongMapItem = {
  dongCode: string;
  dongName: string;
  rentalCount: number;
  avgLatitude: number;
  avgLongitude: number;
};

export type RentalNotice = {
  createdAt: string;
  updatedAt: string;
  noticeId: number;
  pblancId: string;
  noticeName: string;
  institutionType: string;
  status: string;
  houseType: string;
  supplyType: string;
  createdDate: string;
  announceDate: string;
  supplyHoCount: string;
  contactInfo: string;
  institutionUrl: string;
  houseName: string;
  sidoName: string;
  gugunName: string;
  pnu: string;
  beginDate: string;
  endDate: string;
  lastSyncedAt: string | null;
};
